import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DishToOrder} from '../models/DishToOrder';
import {DishIdWithQuantity, Order} from '../models/Order';
import {Observable} from 'rxjs';
import {Dish} from '../models/Dish';
import {PersonalData} from '../models/PersonalData';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  dishesToOrder: DishToOrder[] = [];

  addDishToOrder(dish: Dish) {
    const dishToOrder: DishToOrder = <DishToOrder>dish;
    const index: number = this.dishesToOrder.findIndex(item => item.id === dishToOrder.id);
    if (index === -1) {
      dishToOrder.numberOfOrders = 1;
      this.dishesToOrder.push(dishToOrder);
    } else {
      this.dishesToOrder[index].numberOfOrders++;
    }
  }

  getDishesToOrder(): DishToOrder[] {
    return this.dishesToOrder;
  }

  getAmountToPay(): number {
    let amountToPay = 0;
    for (const dishToOrder of this.dishesToOrder) {
      amountToPay += +dishToOrder.price * dishToOrder.numberOfOrders;
    }
    return amountToPay;
  }

  deleteDishToOrder(dishToOrder: DishToOrder) {
    for (let i = 0; i < this.dishesToOrder.length; i++) {
      if (this.dishesToOrder[i] === dishToOrder) {
        this.dishesToOrder.splice(i, 1);
        return;
      }
    }
  }

  decrementQuantity(dishToOrder: DishToOrder) {
    const index: number = this.dishesToOrder.findIndex(item => item.id === dishToOrder.id);
    if (dishToOrder.numberOfOrders === 1) {
      this.dishesToOrder.splice(index, 1);
    } else if (dishToOrder.numberOfOrders > 1) {
      dishToOrder.numberOfOrders--;
    } else {
      return;
    }
  }

  submitOrder(personalData: PersonalData): Observable<Order> {
    const order: Order = this.convertToOrder();
    order.personalData = personalData;
    const order$: Observable<Order> = this.http.post<Order>('api/orders', order);
    this.dishesToOrder = [];
    return order$;
  }

  private convertToOrder(): Order {
    const order: Order = {
      id: undefined,
      dishIdsWithQuantities: []
    };
    for (const dishToOrder of this.dishesToOrder) {
      const dishIdWithQuantity: DishIdWithQuantity = {dishId: dishToOrder.id, quantity: dishToOrder.numberOfOrders};
      order.dishIdsWithQuantities.push(dishIdWithQuantity);
    }
    return order;
  }

  constructor(private http: HttpClient) {
  }
}
