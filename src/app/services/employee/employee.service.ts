import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from '../../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _myAppUrl: string = environment.endpoint;
  private _myApiUrl: string = 'api/Employee/';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this._myAppUrl}${this._myApiUrl}`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this._myAppUrl}${this._myApiUrl}${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${this._myAppUrl}${this._myApiUrl}`,
      employee
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(
      `${this._myAppUrl}${this._myApiUrl}${id}`,
      employee
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this._myAppUrl}${this._myApiUrl}${id}`);
  }
}
