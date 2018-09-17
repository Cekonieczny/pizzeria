import {Component, OnInit} from '@angular/core';
import {DishWithQuantity} from '../models/DishWithQuantity';
import {PersonalData} from '../models/PersonalData';
import {OrderConfirmationService} from './order-confirmation.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  personalData: PersonalData;
  dishesToOrder: DishWithQuantity[] = [];

  constructor(private orderConfirmationService: OrderConfirmationService) {
  }

  ngOnInit() {
    this.setPersonalData();
    this.setDishesToOrder();
  }

  setPersonalData() {
    this.personalData = this.orderConfirmationService.getPersonalData();
  }

  setDishesToOrder() {
    this.dishesToOrder = this.orderConfirmationService.getdishesToOrder();
  }

}
