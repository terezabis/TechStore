import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
//import { ToastrModule } from 'ngx-toastr';
//import { ServiceModule } from "./core/services/services.module";
//import { GuardsModule } from './core/guards/guards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from './components/shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { routes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    //ServiceModule,
    SharedModule,
    //GuardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
