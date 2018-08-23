import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/products/product.view.model';
import { AuthService } from '../../../core/services/auth.service';
import { ProductCartViewModel } from '../../../core/models/products/product-cart.view.model';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]>;
  pageSize: number = 8;
  currentPage: number = 1;
  currUserName: string;
  product: Product;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    // property gets lazy collection (Observable) with all products over time
    this.products = this.productsService.getProducts();
  }

  // function for change pages
  pageChanged(page) {
    this.currentPage = page;
  }

  // add product in current user's shoping cart
  buyProduct(id: string) {
    this.currUserName = this.authService.getUserNameFromEmail();
    this.productsService.getProductById(id)
      .subscribe(data => {
        this.productsService.addProductInCart(this.currUserName, new ProductCartViewModel(
          id,
          data.name,
          data.model,
          data.image,
          data.price,
          1 // count
        ))
          .subscribe(() => {
            // after successful product added in cart - get messege for success
            this.toastr.success('Product added to cart!', ' Success');
          });
      });
  }

}
