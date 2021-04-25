import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';


let routes: Routes;
routes = [
  {
    path: "",
    children: [
      { path: "pedido", component: PedidoComponent },
      { path: "carrito", component: CarritoComponent },
      { path: "detalle-pedido", component: DetallePedidoComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule {
}
