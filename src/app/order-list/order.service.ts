import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/Order';
import {HttpClient} from '@angular/common/http';
import {Dish} from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('api/orders');
  }
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`api/orders/${id}`);
  }}
