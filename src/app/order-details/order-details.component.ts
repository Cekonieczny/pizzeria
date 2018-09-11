import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../models/Order';
import {OrderService} from '../order-list/order.service';
import {DishService} from '../dishes/dish.service';
import {Dish} from '../models/Dish';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order: Order;
  dishes: Dish[];
  dish: Dish;
  private readonly destroy$ = new Subject();

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private dishService: DishService) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(+id).pipe(takeUntil(this.destroy$))
      .subscribe(item => this.order = item);
    this.getDishes();
  }

  getDishes() {
    for (const dishIdWithQuantity of this.order.dishIdsWithQuantities) {
      this.getDishById(dishIdWithQuantity.dishId);
      this.dishes.push(this.dish);
    }
  }

  private getDishById(id: number): void {
    this.dishService.getDishById(+id).pipe(takeUntil(this.destroy$))
      .subscribe(item => this.dish = item);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
