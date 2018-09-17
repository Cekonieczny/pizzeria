import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DishesComponent} from './dishes.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DishService} from './dish.service';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {of, Subject} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Dish} from '../models/Dish';
import {DishType} from '../models/DishType';

describe('DishesComponent', () => {
  let params: Subject<Params>;
  let component: DishesComponent;
  let fixture: ComponentFixture<DishesComponent>;
  let service: DishService;

  beforeEach(async(() => {
    params = new Subject<Params>();
    TestBed.configureTestingModule({
      declarations: [DishesComponent, ShoppingCartComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [DishService, {
        provide: ActivatedRoute, useValue: {
          paramMap: params
        }
      }]
    })
      .compileComponents();
    service = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get all dishes', fakeAsync(() => {
    // given
    const dish: Dish = {
      id: 1,
      name: 'testName',
      type: DishType.pizza,
      description: 'description',
      isAvailable: true,
      price: 2
    };
    const dishes: Dish[] = [dish];
    spyOn(service, 'getDishes').and.returnValue(of(dishes));
    // when
    component.ngOnInit();
    params.next(<ParamMap>({
      get: (key: string) => 'all'
    }));
    // then
    tick();
    expect(service.getDishes).toHaveBeenCalled();
    expect(component.dishes).toBe(dishes);
  }));

  it('should get dishes by type', fakeAsync(() => {
    // given
    const dish: Dish = {
      id: 1,
      name: 'testName',
      type: DishType.pizza,
      description: 'description',
      isAvailable: true,
      price: 2
    };
    const dishes: Dish[] = [dish];
    spyOn(service, 'getDishesByType').and.returnValue(of(dishes));
    // when
    component.ngOnInit();
    params.next(<ParamMap>({
      get: (key: string) => 'pizza'
    }));
    // then
    tick();
    expect(service.getDishesByType).toHaveBeenCalled();
    expect(component.dishes).toBe(dishes);
  }));

  it('should change availability', fakeAsync(() => {
    // given
    const availabilityBefore = true;
    const dish: Dish = {
      id: 1,
      name: 'testName',
      type: DishType.pizza,
      description: 'description',
      isAvailable: availabilityBefore,
      price: 2
    };

    spyOn(service, 'updateAvailability').and.returnValue(of(dish));
    // when
    component.updateAvailability(dish);
    // then
    expect(service.updateAvailability).toHaveBeenCalled();
    expect(dish.isAvailable).toBe(!availabilityBefore);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
