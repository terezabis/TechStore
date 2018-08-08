import { Component, OnInit } from '@angular/core';
import { Product } from './../../../core/models/products/product.view.model';
import { ProductsService } from './../../../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: string;
  bindModel: Product;
  categoryList: Observable<any[]>;
  categoryForm: FormGroup;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.categoryList = this.productsService.getCategories();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productsService.getProductById(this.id)
      .subscribe((data) => {
        this.bindModel = data;
      });
      this.categoryForm = this.fb.group({
        categoryControl: ['Category']
      });
  }

  editProd() {
    const body = {
      [this.id]: this.bindModel
    }

    this.productsService.editProduct(body)
      .subscribe((data) => {
        this.toastr.success('Product edited!', 'Success!');
        this.router.navigate(['/products']);
      })
  }

}
