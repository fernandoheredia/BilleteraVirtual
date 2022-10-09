import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaPersonalComponent } from './pages/cuenta-personal/cuenta-personal.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cuenta-personal', component: CuentaPersonalComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
