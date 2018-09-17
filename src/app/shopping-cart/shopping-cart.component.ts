import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {DishWithQuantity} from '../models/DishWithQuantity';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  constructor(private shoppingCartService: ShoppingCartService,
              public router: Router) {
  }
  getDishesToOrder(): DishWithQuantity[] {
    return this.shoppingCartService.getDishesToOrder();
  }

  getAmountToPay(): number {
    return this.shoppingCartService.getAmountToPay();
  }

  deleteDishFromDishesToOrder(dishToOrder: DishWithQuantity) {
    this.shoppingCartService.deleteDishToOrder(dishToOrder);
  }

  decrementQuantity(dishToOrder: DishWithQuantity) {
    this.shoppingCartService.decrementQuantity(dishToOrder);
  }

  ngOnInit() {
  }

}
