import {Dish} from './Dish';

export interface DishToOrder extends Dish {
  numberOfOrders: number;
}
