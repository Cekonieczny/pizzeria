import {Injectable} from '@angular/core';
import {PersonalData} from '../models/PersonalData';
import {DishWithQuantity} from '../models/DishWithQuantity';

@Injectable({
  providedIn: 'root'
})
export class OrderConfirmationService {
  private personalData: PersonalData;
  private dishesWithQuantities: DishWithQuantity[] = [];

  setPersonalData(personalData: PersonalData) {
    this.personalData = personalData;
  }

  setDishesToOrder(dishesWithQuantities: DishWithQuantity[]) {
    this.dishesWithQuantities = dishesWithQuantities;
  }

  getPersonalData() {
    return this.personalData;
  }

  getDishesToOrder() {
    return this.dishesWithQuantities;
  }

  constructor() {
  }
}
