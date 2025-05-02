import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _myAppUrl: string = environment.endpoint;
  private _myApiUrl: string = 'api/Product/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this._myAppUrl}${this._myApiUrl}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this._myAppUrl}${this._myApiUrl}${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this._myAppUrl}${this._myApiUrl}`,
      product
    );
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(
      `${this._myAppUrl}${this._myApiUrl}${id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this._myAppUrl}${this._myApiUrl}${id}`);
  }
}
