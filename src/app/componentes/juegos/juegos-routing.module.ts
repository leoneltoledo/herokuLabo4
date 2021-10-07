import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { BatallaComponent } from './batalla/batalla.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { MemotestComponent } from './memotest/memotest.component';
import { PptComponent } from './ppt/ppt.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { TatetiComponent } from './tateti/tateti.component';


const routes: Routes = [
  { path: 'ppt', component: PptComponent },
  { path: 'tateti', component: TatetiComponent },
  { path: 'memotest', component: MemotestComponent},
  { path: 'batalla', component: BatallaComponent},
  { path: 'ahorcado', component: AhorcadoComponent},
  { path: 'mayormenor', component: MayormenorComponent},
  { path: 'preguntados', component: PreguntadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
