import { Component, OnInit } from '@angular/core';
import { Product } from './../../../core/models/products/product.view.model';
import { ProductsService } from './../../../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoriesService } from '../../../core/services/categories.service';

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
    private fb: FormBuilder,
    private categoriesService: CategoriesService

  ) {
    // property gets id value from url params
    this.id = this.route.snapshot.params['id'];    
  }

  ngOnInit() {
    // property gets lazy collection of all categories
    this.categoryList = this.categoriesService.getCategories();
    // gets product by id and added its values in submitting form fields
    this.productsService.getProductById(this.id)
      .subscribe((data) => {
        this.bindModel = data;
      });
    // property for visualize options in dropdown list
    this.categoryForm = this.fb.group({ categoryControl: ['Category'] });
  }

  editProd() {
    // constant variable with values from submitted form 
    const body = { [this.id]: this.bindModel }

    // update product in database with submitted values 
    this.productsService.editProduct(body)
      .subscribe((data) => {
        // after successful product updated - get messege for success
        this.toastr.success('Product edited!', 'Success!');
        // redirect to page with all products
        this.router.navigate(['/products']);
      })
  }

}
