export interface Order {
  id: number;
  dishIdsWithQuantities: DishIdWithQuantity[];
}

export interface DishIdWithQuantity {
  dishId: number;
  quantity: number;
}

