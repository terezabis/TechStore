import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CategoryInputModel } from '../models/categories/category.input.model';
import { map } from 'rxjs/operators';

const dbUrl = 'https://techstore-e9877.firebaseio.com/categories/';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // create new category in database
  createCategory(body: CategoryInputModel) {
    return this.http.post(`${dbUrl}.json`, body);
  }

  // get all categories from database
  getCategories() {
    return this.http.get(`${dbUrl}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res);
        const categories: string[] = [];
        for (const i of ids) {
          // add each category name in the created new array
          categories.push(res[i].name);
        }
        return categories;
      }));
  }

}
