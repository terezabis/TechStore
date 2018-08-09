import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomFormsModule } from 'ng2-validation';
import { productsComponent } from './index';
import { ProductsRoutingModule } from "./products.routing";

@NgModule({
    declarations: [
        ...productsComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      CustomFormsModule,
      ReactiveFormsModule,
      ProductsRoutingModule
    ]
  })
  export class ProductsModule { }