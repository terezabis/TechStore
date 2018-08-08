import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/products/product.view.model';
import { ProductsService } from './../../../core/services/products.service';


@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {
  products: Product[];
  name : string;

  constructor(
    private productsService : ProductsService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    this.productsService.getProductsByCategory(this.name)
      .subscribe(data => {
        this.products = data;
      })
  }

}
