import {inject, TestBed} from '@angular/core/testing';
import {ShoppingCartService} from './shopping-cart.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Dish} from '../models/Dish';
import {DishType} from '../models/DishType';
import {DishIdWithQuantity, Order} from '../models/Order';
import {PersonalData} from '../models/PersonalData';
import {DishWithQuantity} from '../models/DishWithQuantity';

describe('ShoppingCartService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ShoppingCartService]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ShoppingCartService], (service: ShoppingCartService) => {
    expect(service).toBeTruthy();
  }));

  it('should add dish to order', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const dish: Dish = {
      id: 1,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    // when
    service.addDishToOrder(dish);
    // then
    expect(service.getDishesToOrder().length).toBe(1);
    expect(service.getDishesToOrder()[0].name).toBe(dish.name);
    expect(service.getDishesToOrder()[0].isAvailable).toBe(true);
    expect(service.getDishesToOrder()[0].quantity).toBe(1);
    expect(service.getDishesToOrder()[0].type).toBe(dish.type);
    expect(service.getDishesToOrder()[0].description).toBe(dish.description);
    expect(service.getDishesToOrder()[0].price).toBe(dish.price);
  }));

  it('should add two different dishes to order', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const dish1: Dish = {
      id: 1,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    const dish2: Dish = {
      id: 2,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    // when
    service.addDishToOrder(dish1);
    service.addDishToOrder(dish2);
    // then
    expect(service.getDishesToOrder().length).toBe(2);
  }));

  it('should add two same dishes to order', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const dish: Dish = {
      id: 2,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    // when
    service.addDishToOrder(dish);
    service.addDishToOrder(dish);
    // then
    expect(service.getDishesToOrder().length).toBe(1);
    expect(service.getDishesToOrder()[0].quantity).toBe(2);
  }));

  it('should perform POST on submit order', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const testData: Order = {dishIdsWithQuantities: undefined};
    const ordersUrl = 'api/orders';
    const personalData: PersonalData = {firstName: undefined, lastName: undefined, address: undefined, phoneNumber: undefined};
    // when
    service.submitOrder(personalData).subscribe(
      order => expect(order).toEqual(testData, 'should return expected order'),
      fail
    );
    // then
    const req = httpTestingController.expectOne(ordersUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
    httpTestingController.verify();
  }));

  it('should return order on submit', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const dish: Dish = {
      id: 2,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    service.addDishToOrder(dish);
    expect(service.getDishesToOrder()[0].id).toBe(dish.id);

    const ordersUrl = 'api/orders';
    const testPersonalData: PersonalData = {firstName: undefined, lastName: undefined, address: undefined, phoneNumber: undefined};
    const dishIdWithQuantity: DishIdWithQuantity = {dishId: dish.id, quantity: service.getDishesToOrder()[0].quantity};
    const expectedOrder: Order = {dishIdsWithQuantities: [dishIdWithQuantity], personalData: testPersonalData};

    // when && then
    const returnedOrder = service.submitOrder(testPersonalData).subscribe(
      order => expect(order).toEqual(expectedOrder, 'should return expected order'),
      fail
    );
  }));


  it('should calculate amount to pay', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const dish1: Dish = {
      id: 1,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    const dish2: Dish = {
      id: 2,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 14
    };
    service.addDishToOrder(dish1);
    service.addDishToOrder(dish1);
    service.addDishToOrder(dish2);
    const amountToPayExpected = dish1.price + dish2.price + dish1.price;
    expect(service.getDishesToOrder().length).toBe(2);
    expect(service.getDishesToOrder()[0].quantity).toBe(2);
    expect(service.getDishesToOrder()[1].quantity).toBe(1);
    expect(service.getDishesToOrder()[0].price).toBe(dish1.price);
    expect(service.getDishesToOrder()[1].price).toBe(dish2.price);
    // when
    const amountToPayActual = service.getAmountToPay();
    // then
    expect(amountToPayActual).toBe(amountToPayExpected);
  }));

  it('should delete dish to order', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const dish1: Dish = {
      id: 1,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    service.addDishToOrder(dish1);
    service.addDishToOrder(dish1);
    const dishWithQuantity1: DishWithQuantity = service.getDishesToOrder()[0];
    // when
    service.deleteDishToOrder(dishWithQuantity1);
    // then
    expect(service.getDishesToOrder().find(item => (dishWithQuantity1 === item))).toBe(undefined);
  }));

  it('should decrement a dish to order quantity', inject([ShoppingCartService], (service: ShoppingCartService) => {
    // given
    const dish1: Dish = {
      id: 1,
      name: 'testName',
      isAvailable: true,
      description: 'testDescription',
      type: DishType.pizza,
      price: 12
    };
    service.addDishToOrder(dish1);
    service.addDishToOrder(dish1);
    const quantityBefore = service.getDishesToOrder()[0].quantity;
    expect(service.getDishesToOrder().length).toBe(1);
    expect(service.getDishesToOrder()[0].quantity).toBe(quantityBefore);
    // when
    service.decrementQuantity(service.getDishesToOrder()[0]);
    // then
    expect(service.getDishesToOrder()[0].quantity).toBe(quantityBefore - 1);
  }));

  it('should delete a dish to order on decrement quantity when quantity is equal to 1',
    inject([ShoppingCartService], (service: ShoppingCartService) => {
      // given
      const dish1: Dish = {
        id: 1,
        name: 'testName',
        isAvailable: true,
        description: 'testDescription',
        type: DishType.pizza,
        price: 12
      };
      service.addDishToOrder(dish1);
      expect(service.getDishesToOrder().length).toBe(1);
      expect(service.getDishesToOrder()[0]).toBeTruthy();
      // when
      service.decrementQuantity(service.getDishesToOrder()[0]);
      // then
      expect(service.getDishesToOrder()[0]).toBeFalsy();
    }));
});
