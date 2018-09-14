import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Dish} from '../models/Dish';
import {HttpClient} from '@angular/common/http';
import {DishType} from '../models/DishType';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>('api/dishes');
  }

  getDishesByType(type: DishType): Observable<Dish[]> {
    return this.http.get<Dish[]>('api/dishes/?type=' + DishType[type]);
  }

  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`/api/dishes/${id}`);
  }

  updateAvailability(dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`/api/dishes/${dish.id}`, dish);
  }

  constructor(private http: HttpClient) {
  }
}
