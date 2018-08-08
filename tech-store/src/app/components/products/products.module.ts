import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { productsComponent } from './index';
import { ProductsRoutingModule } from "./products.routing";

@NgModule({
    declarations: [
        ...productsComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ProductsRoutingModule
    ]
  })
  export class ProductsModule { }