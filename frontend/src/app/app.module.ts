import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from './shared/shared.module';
import {DefaultModule} from './layouts/default/default.module';
import {RoutesModule} from './routes/routes.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DetallePedidoComponent } from './modules/components/realizar-pedido/detalle-pedido/detalle-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    DetallePedidoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    SharedModule,
    RoutesModule,
    DefaultModule,
    FormsModule


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
