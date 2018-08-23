import { Component, OnInit } from '@angular/core';
import { CategoryInputModel } from '../../../core/models/categories/category.input.model';
import { CategoriesService } from '../../../core/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  bindModel: CategoryInputModel;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {
    this.bindModel = new CategoryInputModel("");
  }

  ngOnInit() {
  }

  createCat() {
    // create new category with fields in submitted model
    this.categoriesService.createCategory(this.bindModel)
      .subscribe(() => {
        // after successful category added - get messege for success
        this.toastr.success('Category created!', ' Success');
        // redirect to page with all categories
        this.router.navigate(['/categories']);
      });
  }
}
