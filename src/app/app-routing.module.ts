import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DishesComponent} from './dishes/dishes.component';
import {SummaryComponent} from './summary/summary.component';
import {OrderListComponent} from './order-list/order-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/dishes/all', pathMatch: 'full'},
  {path: 'dishes/:type', component: DishesComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'order-list', component: OrderListComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
