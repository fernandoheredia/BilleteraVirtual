import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaPersonalComponent } from './pages/cuenta-personal/cuenta-personal.component';
import { HomeComponent } from './pages/home/home.component';
import { IntercambiarComponent } from './components/intercambiar/intercambiar.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { DepositarComponent } from './components/depositar/depositar.component';
import { RetirarComponent } from './components/retirar/retirar.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { RetirarDetalleComponent } from './components/retirar-detalle/retirar-detalle.component';
import { RetirarFinalComponent } from './components/retirar-final/retirar-final.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'recuperar-contraseña',component:RecuperarContrasenaComponent},
  {path: 'cuenta-personal', component: CuentaPersonalComponent, children:[
    {path:'intercambiar', component: IntercambiarComponent},
    {path:'depositar', component: DepositarComponent},
    {path:'retirar', component: RetirarComponent},
    {path:'retirar-detalle', component: RetirarDetalleComponent},
    {path:'retirar-final', component: RetirarFinalComponent}
    ]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
