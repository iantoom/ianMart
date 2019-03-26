import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponentComponent } from './pos-component/pos-component.component';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  imports: [
    CommonModule,
    PosRoutingModule,
    AppMaterialModule
  ],
  declarations: [PosComponentComponent]
})
export class PosModule { }
