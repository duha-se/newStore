import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DonateComponent } from './donate/donate.component';
import {ImpactComponent} from "./impact/impact.component";
import {LoginComponent} from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'restaurants-list', component: RestaurantsListComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'impact', component: ImpactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'prod', component: ProductsComponent },
  { path: 'contact', component: ContactComponent },
  // { path: 'restaurants-list/meals/:restaurantId', component: MealsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
