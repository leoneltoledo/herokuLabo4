import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ListadoJuegosComponent } from './componentes/listado-juegos/listado-juegos.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'quien-soy', component: QuienSoyComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'juegos', loadChildren: () => import('./componentes/juegos/juegos.module').then(m => m.JuegosModule) },
  {path: 'chat', component: ChatComponent},
  {path: 'encuesta', component: EncuestaComponent},
  {path: 'listado', component: ListadoJuegosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
