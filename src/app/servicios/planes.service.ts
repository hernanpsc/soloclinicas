import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Planes } from '../interfaces/planes';
import { SERVER_URL } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private url = SERVER_URL;
  private planes$: Subject<Planes[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshPlanes() {
    this.httpClient.get<Planes[]>(`${this.url}/planes`)
      .subscribe(planes => {
        this.planes$.next(planes);
      });
  }

  getPlanes(): Subject<Planes[]> {
    this.refreshPlanes();
    return this.planes$;
  }

  getPlan(id: string): Observable<Planes> {
    return this.httpClient.get<Planes>(`${this.url}/planes/${id}`);
  }

  createPlan(planes: Planes): Observable<string> {
    return this.httpClient.post(`${this.url}/planes`, planes, { responseType: 'text' });
  }

  updatePlan(id: string, planes: Planes): Observable<string> {
    return this.httpClient.put(`${this.url}/planes/${id}`, planes, { responseType: 'text' });
  }

  deletePlan(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/planes/${id}`, { responseType: 'text' });
  }

  actualizarPrecios(array1: any, array2: any) {
    console.log('Planes:', array1);
    console.log('Precios:', array2);
  
    for (let obj1 of array1) {
      console.log(`Pasada número sobre el array1: ${obj1.item_id}`);
      const obj2 = array2.find((o: { item_id: any; }) => o.item_id === obj1.item_id);
      if (obj2) {
        obj1.precio = obj2.precio;
      }
      console.log('Plan actualizado:', obj1);
    }
    console.log('Planes actualizados:', array1);
    return array1;
  }
  
  
}
