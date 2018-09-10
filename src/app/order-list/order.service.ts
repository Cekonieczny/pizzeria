import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../Order';
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

}
