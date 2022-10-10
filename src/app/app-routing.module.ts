import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaPersonalComponent } from './pages/cuenta-personal/cuenta-personal.component';
import { HomeComponent } from './pages/home/home.component';
import { IntercambiarComponent } from './components/intercambiar/intercambiar.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { DepositarComponent } from './components/depositar/depositar.component';
import { RetirarComponent } from './components/retirar/retirar.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cuenta-personal', component: CuentaPersonalComponent, children:[
    {path:'intercambiar', component: IntercambiarComponent},
    {path:'depositar', component: DepositarComponent},
    {path:'retirar', component: RetirarComponent}
    
    ]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
