import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DishComponent } from './dish/dish.component';
import { AppRoutingModule } from './/app-routing.module';
import { DishesComponent } from './dishes/dishes.component';
import {HttpClientModule} from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SummaryComponent } from './summary/summary.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    DishesComponent,
    ShoppingCartComponent,
    SummaryComponent,
    OrderListComponent,
    OrderDetailsComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
