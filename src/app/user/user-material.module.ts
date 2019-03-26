import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatDatepickerModule,
  MatDividerModule, MatLineModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatStepperModule } from '@angular/material';

@NgModule({
  declarations: [

  ],
  imports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDividerModule,
    MatLineModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule
  ],
  exports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDividerModule,
    MatLineModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule
  ]
})
export class UserMaterialModule { }
