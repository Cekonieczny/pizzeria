export interface Order {
  id?: number;
  dishIdsWithQuantities: DishIdWithQuantity[];
}

interface DishIdWithQuantity {
  dishId: number;
  quantity: number;
}

