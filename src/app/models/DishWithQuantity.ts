import {Dish} from './Dish';

export interface DishWithQuantity extends Dish {
  quantity: number;
}
