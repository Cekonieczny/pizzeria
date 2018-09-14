import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DishesComponent} from './dishes/dishes.component';
import {SummaryComponent} from './summary/summary.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {UserService} from './user.service';

const routes: Routes = [
  {path: '', redirectTo: '/dishes/all', pathMatch: 'full'},
  {path: 'dishes/:type', component: DishesComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'order-list', component: OrderListComponent, canActivate: [UserService]},
  {path: 'order-details/:id', component: OrderDetailsComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
