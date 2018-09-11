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
    return this.http.get<Dish>(`/api/projects/${id}`);
  }

  constructor(private http: HttpClient) {
  }
}
