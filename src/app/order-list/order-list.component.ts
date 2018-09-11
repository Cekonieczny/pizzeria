import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from './order.service';
import {Order} from '../models/Order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',

  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders = [];
  @Input() order: Order;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    return this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

}
