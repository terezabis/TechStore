import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Observable } from '../../../../../node_modules/rxjs';
import { Product } from '../../../core/models/products/product.view.model';
import { ProductCartViewModel } from '../../../core/models/products/product-cart.view.model';

@Component({
  selector: 'app-products-mine',
  templateUrl: './products-mine.component.html',
  styleUrls: ['./products-mine.component.css']
})
export class ProductsMineComponent implements OnInit {
  products: Observable<ProductCartViewModel[]>;
  name: string;
  pageSize: number = 8;
  currentPage: number = 1;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.name = this.route.snapshot.params['name'];
  }

  ngOnInit() {
    this.products = this.productsService.getBuyedProducts(this.name);
  }

  pageChanged(page) {
    this.currentPage = page;
  }

  removeProduct(productId) {
    this.productsService.removeProductFromCart(this.name, productId)
      .subscribe((data) => {
        this.toastr.success('Product remove from cart!', 'Success!');
        this.ngOnInit();
      })
  }

  finishOrder() {
    this.productsService.completeOrder(this.name)
      .subscribe((data) => {
        this.toastr.success('Order sent!', 'Success!');
        this.router.navigate(['/products']);
      })
  }

}
