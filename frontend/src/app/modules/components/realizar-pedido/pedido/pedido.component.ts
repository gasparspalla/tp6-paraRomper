import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Pedido } from "../../../../models/pedido";
import { Tarjeta } from "../../../../models/tarjeta";
import { Combo } from "../../../../models/combo";
import { Router } from "@angular/router";
import { CustomValidators } from "../../../../shared/custom-validator/custom-validators";
import { MatDatepicker } from "@angular/material/datepicker";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import { default as _rollupMoment, Moment } from "moment";
import * as _moment from "moment";
import { NotificacionService } from "../../../../services/notificacion.service";
import * as XLSX from "xlsx";
import { MatTab } from "@angular/material/tabs";
import { AuthService } from "../../../../services/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { stringify } from "@angular/compiler/src/util";
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];
@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrls: ["./pedido.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PedidoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private excellService: AuthService
  ) {}

  form: FormGroup;
  formTarjeta: FormGroup;
  formEfectivo: FormGroup;
  data: Pedido = new Pedido();
  ciudadLista: Combo[] = [
    { id: 1, nombre: "Córdoba" },
    { id: 2, nombre: "Buenos Aires" },
    { id: 3, nombre: "Rosario" },
  ];
  formaPago = "Efectivo";
  formaPagoLista = ["Efectivo", "Tarjeta Visa"];
  secondForm: any;
  public cantidad: number;
  date = new FormControl(moment());
  minDate = new Date();
  dpFechaEntrega = new FormControl(new Date());
  rbFormaPago = new FormControl("Efectivo");

  ngOnInit(): void {
    this.data.tarjeta = new Tarjeta();
    this.cantidad = +history.state.navSettings;
    console.error(this.cantidad);
    this.crearForm();

    this.rbFormaPago.valueChanges.subscribe((value) => {
      if (value) {
        if (value === "Efectivo") {
          this.formTarjeta.reset();
        } else if (value === "Tarjeta Visa") {
          this.formEfectivo.reset();
        }
      }
    });
  }

  public crearForm() {
    this.form = this.fb.group({
      txCalle: [""],
      txNroCalle: [""],
      nCiudad: [],
      txDescripcion: [""],
      txNroTarjeta: [
        "",
        [CustomValidators.digitNumber(16), CustomValidators.naranja],
      ],
      txNombreTarjeta: ["", CustomValidators.validText],
      txApellidoTarjeta: ["", CustomValidators.validText],
      dpFechaVencimiento: new FormControl(new moment()),
      txCVC: ["", CustomValidators.digitNumber(3)],
      horaEntrega: [true],
    });

    this.formEfectivo = this.fb.group({
      txEfectivo: [
        "",
        [CustomValidators.minValue(this.cantidad * 450), Validators.required],
      ],
    });
    this.formTarjeta = this.fb.group({
      txNroTarjeta: [
        "",
        [CustomValidators.digitNumber(16), CustomValidators.naranja],
      ],
      txNombreTarjeta: ["", CustomValidators.validText],
      txApellidoTarjeta: ["", CustomValidators.validText],
      dpFechaVencimiento: new FormControl(new moment()),
      txCVC: ["", CustomValidators.digitNumber(3)],
    });
  }

  // guardarPedido() {
  //   this.notificacionService.messageOpen('¿Desea confirmar su pedido?', 'Atención', 1).beforeClosed().subscribe(value => {});

  irADetallePedido() {
    this.router.navigate(["pedido", "detalle-pedido"], {
      state: { navSettings: this.cantidad },
    });
  }

  anterior() {
    this.router.navigate(["pedido", "carrito"], {
      state: { navSettings: this.cantidad },
    });
  }
  get txNroTarjeta() {
    return this.formTarjeta.get("txNroTarjeta");
  }

  get txEfectivo() {
    return this.formEfectivo.get("txEfectivo");
  }

  get txNombreTarjeta() {
    return this.formTarjeta.get("txNombreTarjeta");
  }

  get txCVC() {
    return this.formTarjeta.get("txCVC");
  }

  get txApellidoTarjeta() {
    return this.formTarjeta.get("txApellidoTarjeta");
  }

  get dpFechaVencimiento() {
    return this.formTarjeta.get("dpFechaVencimiento");
  }

  get horaEntrega() {
    return this.form.get("horaEntrega");
  }

  get txCalle() {
    return this.form.get("txCalle");
  }

  get nCiudad() {
    return this.form.get("nCiudad");
  }

  get txNroCalle() {
    return this.form.get("txNroCalle");
  }

  get txDescripcion() {
    return this.form.get("txDescripcion");
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dpFechaVencimiento.value;
    ctrlValue.year(normalizedYear.year());
    this.dpFechaVencimiento.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.dpFechaVencimiento.value;
    ctrlValue.month(normalizedMonth.month());
    this.dpFechaVencimiento.setValue(ctrlValue);
    datepicker.close();
  }

  valdiarForms(): boolean {
    if (this.rbFormaPago.value === "Efectivo") {
      if (this.horaEntrega.value) {
        return (
          this.form.invalid ||
          this.formEfectivo.invalid ||
          this.dpFechaEntrega.invalid
        );
      } else {
        return this.form.invalid || this.formEfectivo.invalid;
      }
    } else if (this.rbFormaPago.value === "Tarjeta Visa") {
      if (this.horaEntrega.value) {
        return (
          this.form.invalid ||
          this.formTarjeta.invalid ||
          this.dpFechaEntrega.invalid
        );
      } else {
        return this.form.invalid || this.formTarjeta.invalid;
      }
    }
  }

  listDetalle: any[] = [];
  crearDetalle(): void {
    const detalle: any = {
      txCalle: this.form.get("txCalle")?.value,
      txNroCalle: this.form.get("txNroCalle")?.value,
      nCiudad: this.form.get("nCiudad")?.value,
      txDescripcion: this.form.get("txDescripcion")?.value,
      txNroTarjeta: this.formTarjeta.get("txNroTarjeta")?.value,
      txNombreTarjeta: this.formTarjeta.get("txNombreTarjeta")?.value,
      txApellidoTarjeta: this.formTarjeta.get("txApellidoTarjeta")?.value,
      dpFechaVencimiento: this.formTarjeta.get("dpFechaVencimiento")?.value,
      txCVC: this.formTarjeta.get("txCVC")?.value,
      txEfectivo: this.formEfectivo.get("txEfectivo")?.value,
    };
    this.listDetalle.push(detalle);
  }

  fileName = "";
  guardarExcel(): void {
    const element = document.getElementById("id-table);
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    /* save to file */
    XLSX.writeFile(workbook, (this.fileName = "pedido" + new Date().getTime()));
  }



}
