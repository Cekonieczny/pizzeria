import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from './order.service';
import {Order} from '../models/Order';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',

  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders = [];
  order: Order;
  private readonly destroy$ = new Subject();

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getOrders().pipe(takeUntil(this.destroy$)).subscribe(orders => this.orders = orders);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
