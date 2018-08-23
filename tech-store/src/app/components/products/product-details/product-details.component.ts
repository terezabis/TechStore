import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/products/product.view.model';
import { ProductsService } from './../../../core/services/products.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProductCartViewModel } from './../../../core/models/products/product-cart.view.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  id: string;
  currUserName: string;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    // property gets product's id from url params 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.productsService.getProductById(this.id)
      .subscribe(data => {
        this.product = data;
      });
  }

  // add product in current user's shoping cart
  buyProduct() {
    this.currUserName = this.authService.getUserNameFromEmail();
    this.productsService.addProductInCart(this.currUserName, new ProductCartViewModel(
      this.product.id,
      this.product.name,
      this.product.model,
      this.product.image,
      this.product.price,
      1 // count
    ))
      .subscribe(() => {
        // after successful product added in cart - get messege for success
        this.toastr.success('Product added to cart!', ' Success');
      });
  }

  // remove product from current user's shopping cart
  removeProduct() {
    this.productsService.deleteProduct(this.id)
      .subscribe((data) => {
        // after successful product removed - get messege for success
        this.toastr.success('Product deleted!', 'Success!');
        // redirect to page with all products
        this.router.navigate(['/products']);
      })
  }

}
