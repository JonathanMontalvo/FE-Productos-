import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostOrder } from '../../interfaces/post-order';
import { GetOrder } from '../../interfaces/get-order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _myAppUrl: string = environment.endpoint;
  private _myApiUrl: string = 'api/Order/';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<GetOrder[]> {
    return this.http.get<GetOrder[]>(`${this._myAppUrl}${this._myApiUrl}`);
  }

  getOrder(id: number): Observable<GetOrder> {
    return this.http.get<GetOrder>(`${this._myAppUrl}${this._myApiUrl}${id}`);
  }

  addOrder(order: PostOrder): Observable<GetOrder> {
    return this.http.post<GetOrder>(
      `${this._myAppUrl}${this._myApiUrl}`,
      order
    );
  }
}
