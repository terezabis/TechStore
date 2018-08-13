import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/products/product.view.model';
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css']
})
export class ProductsSearchComponent implements OnInit {
  products: Product[];
  query : string;
  pageSize: number = 8;
  currentPage: number = 1;

  constructor(
    private productsService : ProductsService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router
  ) {
    this.query = "";
   }

  ngOnInit() {
    
  }

  searchProd(){
    this.productsService.searchProducts(this.query)
      .subscribe(data => {
        this.products = data;
      });
  }

  pageChanged(page) {
    this.currentPage = page;
  }

}
