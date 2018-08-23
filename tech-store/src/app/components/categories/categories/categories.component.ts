import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Observable<any[]>;

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    // property gets Observable with all categories
    this.categories = this.categoriesService.getCategories();
  }

}
