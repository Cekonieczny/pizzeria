import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../models/Order';
import {OrderService} from '../order-list/order.service';
import {DishService} from '../dishes/dish.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../login/user.service';
import {DishWithQuantity} from '../models/DishWithQuantity';

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
              public userService: UserService,
              private router: Router) {
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
      let dishWithQuantity;
      this.dishService.getDishById(dishIdWithQuantity.dishId).pipe(takeUntil(this.destroy$))
        .subscribe(item => {
          dishWithQuantity = item;
          dishWithQuantity.quantity = dishIdWithQuantity.quantity;
          this.dishesWithQuantities.push(dishWithQuantity);
        });
    }
  }

  onDelete() {
    this.orderService.deleteOrder(this.order.id).pipe(takeUntil(this.destroy$)).subscribe(item => {
      this.router.navigateByUrl('/order-list');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
