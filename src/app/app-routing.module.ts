import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DishesComponent} from './dishes/dishes.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {UserService} from './login/user.service';
import {OrderConfirmationComponent} from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  {path: '', redirectTo: '/dishes/all', pathMatch: 'full'},
  {path: 'dishes/:type', component: DishesComponent},
  {path: 'order-summary', component: OrderSummaryComponent},
  {path: 'order-list', component: OrderListComponent, canActivate: [UserService]},
  {path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [UserService]},
  {path: 'order-confirmation', component: OrderConfirmationComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
