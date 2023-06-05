import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { SERVER_URL } from '../constants';
import { Empleado } from '../interfaces/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private url = SERVER_URL;
  private employees$: Subject<Empleado[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Empleado[]>(`${this.url}/employees`)
      .subscribe(employees => {
        this.employees$.next(employees);
      });
  }

  getEmployees(): Subject<Empleado[]> {
    this.refreshEmployees();
    return this.employees$;
  }

  getEmployee(id: string): Observable<Empleado> {
    return this.httpClient.get<Empleado>(`${this.url}/employees/${id}`);
  }

  createEmployee(employee: Empleado): Observable<string> {
    return this.httpClient.post(`${this.url}/employees`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Empleado): Observable<string> {
    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
  }
}
