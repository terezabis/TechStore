import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : Observable<any[]>;
  constructor(
    private productsService : ProductsService
  ) { }

  ngOnInit() {
    this.categories = this.productsService.getCategories();
  }

}
