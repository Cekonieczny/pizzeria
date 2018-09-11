import {DishType} from './DishType';

export interface Dish {
  id: number;
  name: string;
  isAvailable: boolean;
  description: string;
  type: DishType;
  price: number;
}
