import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; import { ProductsService } from './../../../core/services/products.service';
import { ProductInputModel } from './../../../core/models/products/product.input.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  bindModel: ProductInputModel;
  categoryList : Observable<any[]>;
  categoryForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {
    this.bindModel = new ProductInputModel("", "", "", "", 0, "");
    this.categoryList = this.productsService.getCategories();
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryControl: ['Category']
    });
  }

  createProd() {
    this.productsService.createProduct(this.bindModel)
      .subscribe(() => {
        this.toastr.success('Product created!', ' Success');
        this.router.navigate(['/products']);
      });
  }

}
