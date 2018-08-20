import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/products/product.view.model';
import { ProductInputModel } from '../models/products/product.input.model';
import { AuthService } from './auth.service';
import { ProductCartViewModel } from '../models/products/product-cart.view.model';

const dbUrl = 'https://techstore-e9877.firebaseio.com/products/';
const dbUrlCart = 'https://techstore-e9877.firebaseio.com/carts/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  userProdIds;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

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

  createProduct(body: ProductInputModel) {
    return this.http.post(`${dbUrl}.json`, body);
  }

  editProduct(body) {
    return this.http.patch(`${dbUrl}.json`, body);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${dbUrl}${productId}/.json`);
  }

  searchProducts(query: string) {
    return this.http.get(`${dbUrl}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res);
        const products: Product[] = [];
        for (const i of ids) {
          if ((res[i].name).toLowerCase().includes(query) ||
            (res[i].model).toLowerCase().includes(query) ||
            (res[i].category).toLowerCase().includes(query) ||
            (res[i].description).toLowerCase().includes(query)) {
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

  getBuyedProducts(userName: string) {
    return this.http.get(`${dbUrlCart}${userName}.json`)
      .pipe(map((res: Response) => {
        if (res != null) {
          const ids = Object.keys(res);
          const products: ProductCartViewModel[] = [];
          for (const i of ids) {
            products.push(new ProductCartViewModel(
              i,
              res[i].name,
              res[i].model,
              res[i].image,
              res[i].price,
              res[i].count
            ));
          }

          return products;
        } else {
          return null;
        }
      }));
  }

  addProductInCart(userName: string, product: ProductCartViewModel) {
    return this.http.post(`${dbUrlCart}${userName}.json`, product);
  }

  removeProductFromCart(userName: string, productId: string) {
    return this.http.delete(`${dbUrlCart}${userName}/${productId}/.json`);
  }

  completeOrder(userName: string) {
    return this.http.delete(`${dbUrlCart}${userName}/.json`);
  }


}