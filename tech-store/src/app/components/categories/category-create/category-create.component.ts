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
    this.categoriesService.createCategory(this.bindModel)
      .subscribe(() => {
        this.toastr.success('Category created!', ' Success');
        this.router.navigate(['/categories']);
      });
  }
}
