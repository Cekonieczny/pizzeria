import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishService} from './dish.service';
import {Dish} from '../models/Dish';
import {ActivatedRoute} from '@angular/router';
import {DishType} from '../models/DishType';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {UserService} from '../login/user.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
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

  updateAvailability(dish: Dish) {
    dish.isAvailable = !dish.isAvailable;
    this.dishService.updateAvailability(dish).subscribe();
  }

  private getDishes(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
  }

  private getDishesByType(dishType: DishType): void {
    this.dishService.getDishesByType(dishType)
      .subscribe(dishes => this.dishes = dishes);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
