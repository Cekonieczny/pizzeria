import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/Order';
import {HttpClient} from '@angular/common/http';

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
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`api/orders/${id}`);
  }
}
