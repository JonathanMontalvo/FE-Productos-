import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _myAppUrl: string = environment.endpoint;
  private _myApiUrl: string = 'api/Category/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this._myAppUrl}${this._myApiUrl}`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this._myAppUrl}${this._myApiUrl}${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this._myAppUrl}${this._myApiUrl}`,
      category
    );
  }

  updateCategory(id: number, category: Category): Observable<void> {
    return this.http.put<void>(
      `${this._myAppUrl}${this._myApiUrl}${id}`,
      category
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this._myAppUrl}${this._myApiUrl}${id}`);
  }
}
