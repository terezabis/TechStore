import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from './components/shared/shared.module';
import { AuthModule } from './components/authentication/auth.module';
import { AppRoutingModule } from './app.routing';
import { ProductsModule } from './components/products/products.module';

import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { ButtonsModule } from './components/buttons/buttons.module';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    ProductsModule,
    ButtonsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
