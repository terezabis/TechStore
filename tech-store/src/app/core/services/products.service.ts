import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/products/product.view.model';
import { ProductInputModel } from '../models/products/product.input.model';
import { AuthService } from './auth.service';
import { ProductCartViewModel } from '../models/products/product-cart.view.model';

const dbUrl = 'https://techstore-e9877.firebaseio.com/';
const dbUrlProducts = dbUrl + 'products/';
const dbUrlCart = dbUrl + 'carts/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  userProdIds;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // get all products from database and return observable
  getProducts() {
    return this.http.get(`${dbUrlProducts}.json`)
      // 'pipe' takes an infinite amount of arguments and each argument is an operator which apply to the Observable
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

  // get product by id from db
  getProductById(productId: string) {
    return this.http.get<Product>(`${dbUrlProducts}${productId}/.json`);
  }

  // create new product 
  createProduct(body: ProductInputModel) {
    return this.http.post(`${dbUrlProducts}.json`, body);
  }

  // update a product
  editProduct(body) {
    return this.http.patch(`${dbUrlProducts}.json`, body);
  }

  // delete a product
  deleteProduct(productId: string) {
    return this.http.delete(`${dbUrlProducts}${productId}/.json`);
  }

  // search product by string which is includes in its title, model, category, or description
  searchProducts(query: string) {
    return this.http.get(`${dbUrlProducts}.json`)
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

  // get all products which are from same category
  getProductsByCategory(categoryName: string) {
    return this.http.get(`${dbUrlProducts}.json`)
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

  // get products which current user is added in his shoping cart
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

  // add a product in user's shopping cart when user
  addProductInCart(userName: string, product: ProductCartViewModel) {
    return this.http.post(`${dbUrlCart}${userName}.json`, product);
  }

  // remove a product from user's shopping cart when user
  removeProductFromCart(userName: string, productId: string) {
    return this.http.delete(`${dbUrlCart}${userName}/${productId}/.json`);
  }

  // user's shopping cart become empty when order is completed
  completeOrder(userName: string) {
    return this.http.delete(`${dbUrlCart}${userName}/.json`);
  }


}