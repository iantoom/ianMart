import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosComponentComponent } from './pos-component/pos-component.component';

const routes: Routes = [
  { path: '', component: PosComponentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
