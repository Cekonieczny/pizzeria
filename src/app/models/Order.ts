import {PersonalData} from './PersonalData';

export interface Order {
  id?: number;
  dishIdsWithQuantities: DishIdWithQuantity[];
  personalData?: PersonalData;
}

export interface DishIdWithQuantity {
  dishId: number;
  quantity: number;
}

