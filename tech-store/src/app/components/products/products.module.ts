import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomFormsModule } from 'ng2-validation';
import { productsComponent } from './index';
import { ProductsRoutingModule } from "./products.routing";
import { ButtonsModule } from './../buttons/buttons.module';

@NgModule({
  declarations: [
    ...productsComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    ButtonsModule
  ]
})
export class ProductsModule { } 