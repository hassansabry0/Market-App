import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/component/cart/cart.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
  { path: 'products', component: AllProductsComponent },
  { path: 'details/:id', component: ProductsDetailsComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
