import { Component, OnInit, ViewChild } from "@angular/core";
import { Form, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PedidoComponent } from "../pedido/pedido.component";

@Component({
  selector: "app-detalle-pedido",
  templateUrl: "./detalle-pedido.component.html",
  styleUrls: ["./detalle-pedido.component.scss"],
})
export class DetallePedidoComponent implements OnInit {
  @ViewChild(PedidoComponent) pedido: PedidoComponent;
  constructor(private router: Router, private fb: FormBuilder) {}


  ngOnInit(): void {}

  // cancelar() {
  //   this.router.navigate(["pedido", "carrito"], {
  //     state: { navSettings: this.pedido.cantidad },
  //   });
  // }
}
