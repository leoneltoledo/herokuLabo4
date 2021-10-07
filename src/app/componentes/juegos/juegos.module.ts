import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PptComponent } from './ppt/ppt.component';
import { TatetiComponent } from './tateti/tateti.component';
import { MemotestComponent } from './memotest/memotest.component';
import { BatallaComponent } from './batalla/batalla.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';



@NgModule({
  declarations: [
    PptComponent,
    TatetiComponent,
    MemotestComponent,
    BatallaComponent,
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
