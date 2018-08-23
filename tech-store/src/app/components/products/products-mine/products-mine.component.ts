import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Observable } from '../../../../../node_modules/rxjs';
import { ProductCartViewModel } from '../../../core/models/products/product-cart.view.model';

@Component({
  selector: 'app-products-mine',
  templateUrl: './products-mine.component.html',
  styleUrls: ['./products-mine.component.css']
})
export class ProductsMineComponent implements OnInit {
  products: Observable<ProductCartViewModel[]>;
  name: string;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    // property gets name of current user which is in url params
    this.name = this.route.snapshot.params['name'];
  }

  ngOnInit() {
    // property gets lazy collection (Observable) with all products in user's shopping cart
    this.products = this.productsService.getBuyedProducts(this.name);
  }

  // remove product from shopping cart
  removeProduct(productId) {
    this.productsService.removeProductFromCart(this.name, productId)
      .subscribe((data) => {
        // message for success
        this.toastr.success('Product removed from cart!', 'Success!');
        this.ngOnInit();
      })
  }

  // order is sending and all products are removed from user's shopping cart
  finishOrder() {
    this.productsService.completeOrder(this.name)
      .subscribe((data) => {
        // messege for success
        this.toastr.success('Order sent!', 'Success!');
        // redirect to page with all products
        this.router.navigate(['/products']);
      })
  }
}
