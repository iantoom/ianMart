import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

navLinks = [{label: 'Inventory Dashboard', path: '/inventory/dashboard'},
            {label: 'Stock Entry', path: '/inventory/stockentry'},
            {label: 'Products', path: '/inventory/products'},
            {label: 'Categories', path: '/inventory/categories'}
            ];

  constructor() { }

  ngOnInit() {
  }

}
