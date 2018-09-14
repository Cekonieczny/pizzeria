import {Component, OnInit} from '@angular/core';
import {DishService} from './dish.service';
import {Dish} from '../models/Dish';
import {ActivatedRoute} from '@angular/router';
import {DishType} from '../models/DishType';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  dishes: Dish[];

  constructor(private dishService: DishService,
              private activatedRoute: ActivatedRoute,
              public shoppingCartService: ShoppingCartService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const type = params.get('type');
      if (type === 'all') {
        this.getDishes();
      } else {
        this.getDishesByType((DishType)[type]);
      }
    });
  }

  getDishes(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
  }

  getDishesByType(dishType: DishType): void {
    this.dishService.getDishesByType(dishType)
      .subscribe(dishes => this.dishes = dishes);
  }

  updateAvailability(dish: Dish) {
    dish.isAvailable = !dish.isAvailable;
    this.dishService.updateAvailability(dish).subscribe();
  }
}
