import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { ProductsModule } from './components/products/products.module';
import { AuthGuard } from './core/guards/auth.guard';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { ProductsByCategoryComponent } from './components/products/products-by-category/products-by-category.component';
import { ProductsSearchComponent } from './components/products/products-search/products-search.component';

const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'categories/:name', component: ProductsByCategoryComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    loadChildren: () => ProductsModule,
    canActivate: [AuthGuard]
  },

  {
    path: '**', redirectTo: '/signin'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
