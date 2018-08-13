import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/products/product.view.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Observable<Product[]>; 
  pageSize: number = 8;
  currentPage: number = 1;

  constructor(
    private productsService : ProductsService
  ) { }

  ngOnInit() {
     this.products = this.productsService.getProducts();
  }

  pageChanged(page) {
    this.currentPage = page;
  }

}
