import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetOrdersProduct } from '../../interfaces/get-orders-product';

@Injectable({
  providedIn: 'root',
})
export class OrdersProductService {
  private _myAppUrl: string = environment.endpoint;
  private _myApiUrl: string = 'api/OrdersProduct/';

  constructor(private http: HttpClient) {}

  getOrdersProducts(): Observable<GetOrdersProduct[]> {
    return this.http.get<GetOrdersProduct[]>(
      `${this._myAppUrl}${this._myApiUrl}`
    );
  }

  getOrdersProductsByOrderId(orderId: number): Observable<GetOrdersProduct> {
    return this.http.get<GetOrdersProduct>(
      `${this._myAppUrl}${this._myApiUrl}${orderId}`
    );
  }
}
