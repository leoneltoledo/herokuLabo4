import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdadesComponent } from './edades/edades.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edades', component: EdadesComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'bienvenido', component: BienvenidoComponent},
  {path: 'quien-soy', component: QuienSoyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
