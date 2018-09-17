import {Injectable} from '@angular/core';
import {PersonalData} from '../models/PersonalData';
import {DishWithQuantity} from '../models/DishWithQuantity';

@Injectable({
  providedIn: 'root'
})
export class OrderConfirmationService {
  private personalData: PersonalData;
  private dishesToOrder: DishWithQuantity[] = [];

  setPersonalData(personalData: PersonalData) {
    this.personalData = personalData;
  }

  setDishesToOrder(dishesToOrder: DishWithQuantity[]) {
    this.dishesToOrder = dishesToOrder;
  }

  getPersonalData() {
    return this.personalData;
  }

  getdishesToOrder() {
    return this.dishesToOrder;
  }

  constructor() {
  }
}
