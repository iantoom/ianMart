import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { AppMaterialModule } from '../app-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  declarations: [InventoryComponent, DashboardComponent, StockEntryComponent, ProductsComponent, CategoriesComponent]
})
export class InventoryModule { }
