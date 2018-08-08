import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/products/product.view.model';
import { ProductInputModel } from '../models/products/product.input.model';

const dbUrl = 'https://techstore-e9877.firebaseio.com/products/'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${dbUrl}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res);
        const products: Product[] = [];
        for (const i of ids) {
          products.push(new Product(
            i,
            res[i].name,
            res[i].model,
            res[i].image,
            res[i].description,
            res[i].price,
            res[i].category
          ));
        }

        return products;
      }));
  }

  getProductById(productId: string) {
    return this.http.get<Product>(`${dbUrl}${productId}/.json`);
  }

  createProduct(body : ProductInputModel) {
    return this.http.post(`${dbUrl}.json`, body);
  }

  editProduct(body) {
    return this.http.patch(`${dbUrl}.json`, body);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${dbUrl}${productId}/.json`);
  }

  getCategories() {
    return this.http.get(`${dbUrl}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res);
        const categories: string[] = [];
        for (const i of ids) {
          if (categories.indexOf(res[i].category) === -1) {
            categories.push(res[i].category);
          }
        }
        return categories;
      }));
  }

  getProductsByCategory(categoryName: string) {
    return this.http.get(`${dbUrl}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res);
        const products: Product[] = [];
        for (const i of ids) {
          if (res[i].category === categoryName) {
            products.push(new Product(
              i,
              res[i].name,
              res[i].model,
              res[i].image,
              res[i].description,
              res[i].price,
              res[i].category));
          }
        }
        return products;
      }));
  }
}
