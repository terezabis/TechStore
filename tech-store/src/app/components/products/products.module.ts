import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { productsComponent } from './index';
import { ProductsRoutingModule } from "./products.routing";
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';

@NgModule({
    declarations: [
        ...productsComponent,
        ProductsByCategoryComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ProductsRoutingModule
    ]
  })
  export class ProductsModule { }