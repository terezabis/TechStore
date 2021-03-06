import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/products/product.view.model';
import { ProductsService } from './../../../core/services/products.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProductCartViewModel } from '../../../core/models/products/product-cart.view.model';


@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {
  products: Product[];
  name: string;
  pageSize: number = 8;
  currentPage: number = 1;
  currUserName: string;
  product: Product;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { 
    // property gets name of category which is in url params
    this.name = this.route.snapshot.params['name'];
  }

  ngOnInit() {    
    // property gets lazy collection (Observable) with all products in a category
    this.productsService.getProductsByCategory(this.name)
      .subscribe(data => {
        this.products = data;
      })
  }

  // pagination in the view
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
          1
        ))
          .subscribe(() => {
            // after successful product added in cart - get messege for success
            this.toastr.success('Product added to cart!', ' Success');
          });
      });
  }

}
