import {Component, OnInit} from '@angular/core';
import {OrderService} from './order.service';
import {DishService} from '../dishes/dish.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders = [];

  constructor(private orderService: OrderService,
              private dishService: DishService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    return this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

}
