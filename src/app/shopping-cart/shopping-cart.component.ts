import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {DishToOrder} from '../models/DishToOrder';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  constructor(private shoppingCartService: ShoppingCartService,
              public router: Router) {
  }
  getDishesToOrder(): DishToOrder[] {
    return this.shoppingCartService.getDishesToOrder();
  }

  getAmountToPay(): number {
    return this.shoppingCartService.getAmountToPay();
  }

  deleteDishFromDishesToOrder(dishToOrder: DishToOrder) {
    this.shoppingCartService.deleteDishToOrder(dishToOrder);
  }

  decrementQuantity(dishToOrder: DishToOrder) {
    this.shoppingCartService.decrementQuantity(dishToOrder);
  }

  ngOnInit() {
  }

}
