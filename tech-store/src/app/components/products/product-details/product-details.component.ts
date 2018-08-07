import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/products/product.view.model';
import { ProductsService } from './../../../core/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  id : string;

  constructor(
    private productsService : ProductsService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productsService.getProductById(this.id)
      .subscribe(data => {
        this.product = data;
      })
  }

  removeProduct() {
    this.productsService.deleteProduct(this.id)
      .subscribe((data) => {
        this.toastr.success('Product deleted!', 'Success!');
        this.router.navigate(['/products']);
      })
  }

}
