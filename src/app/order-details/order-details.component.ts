import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../models/Order';
import {OrderService} from '../order-list/order.service';
import {DishService} from '../dishes/dish.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DishWithQuantity} from '../models/DishWithQuantity';
import {UserService} from '../user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order: Order;
  dishesWithQuantities: DishWithQuantity[] = [];
  private readonly destroy$ = new Subject();

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private dishService: DishService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.dishesWithQuantities = [];
      const id = params.get('id');
      this.orderService.getOrderById(+id).pipe(takeUntil(this.destroy$))
        .subscribe(item => {
          this.order = item;
          this.getDishes();
        });
    });
  }

  getDishes() {
    for (const dishIdWithQuantity of this.order.dishIdsWithQuantities) {
      const dishWithQuantity: DishWithQuantity = {dish: undefined, quantity: dishIdWithQuantity.quantity};
      this.dishService.getDishById(dishIdWithQuantity.dishId).pipe(takeUntil(this.destroy$))
        .subscribe(item => {
          dishWithQuantity.dish = item;
          this.dishesWithQuantities.push(dishWithQuantity);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
