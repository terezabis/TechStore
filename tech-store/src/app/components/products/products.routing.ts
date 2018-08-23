import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProductsSearchComponent } from './products-search/products-search.component';
import { ProductsMineComponent } from './products-mine/products-mine.component';

const routes: Route[] = [
    { path: '', pathMatch: 'full', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'create', component: ProductCreateComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: 'edit/:id', component: ProductEditComponent },
    { path: 'search', component: ProductsSearchComponent },
    { path: 'mine/:name', component: ProductsMineComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }