import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemotestComponent } from './memotest/memotest.component';
import { PptComponent } from './ppt/ppt.component';
import { TatetiComponent } from './tateti/tateti.component';


const routes: Routes = [
  { path: 'ppt', component: PptComponent },
  { path: 'tateti', component: TatetiComponent },
  { path: 'memotest', component: MemotestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
