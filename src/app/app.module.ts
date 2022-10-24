import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CuentaPersonalComponent } from './pages/cuenta-personal/cuenta-personal.component';
import { HistorialTransaccionesComponent } from './components/historial-transacciones/historial-transacciones.component';
import { HomeComponent } from './pages/home/home.component';
import { IntercambiarComponent } from './components/intercambiar/intercambiar.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { DepositarComponent } from './components/depositar/depositar.component';
import { RetirarComponent } from './components/retirar/retirar.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { RetirarDetalleComponent } from './components/retirar-detalle/retirar-detalle.component';
import { RetirarFinalComponent } from './components/retirar-final/retirar-final.component';
import { PortafolioCriptoComponent } from './components/portafolio-cripto/portafolio-cripto.component';
import { RegistroComponent } from './pages/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CuentaPersonalComponent,
    HistorialTransaccionesComponent,
    HomeComponent,
    IntercambiarComponent,
    Pagina404Component,
    DepositarComponent,
    RetirarComponent,
    LoginComponent,
    RecuperarContrasenaComponent,
    RetirarDetalleComponent,
    RetirarFinalComponent,
    PortafolioCriptoComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
