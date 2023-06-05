import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Precios } from '../interfaces/precios';
import { Observable, Subject, tap } from 'rxjs';
import { SERVER_URL } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  private url = SERVER_URL;
  private precios$: Subject<Precios[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshPrecios() {
    this.httpClient.get<Precios[]>(`${this.url}/precios`)
      .subscribe(precios => {
        this.precios$.next(precios);
      });
  }

getPrecios(): Subject<Precios[]> {
  this.refreshPrecios();
  return this.precios$;
}

getPrecio(id: string): Observable<Precios> {
    return this.httpClient.get<Precios>(`${this.url}/precios/${id}`);
  }

  createPrecio(precios: Precios): Observable<string> {
    return this.httpClient.post(`${this.url}/precios`, precios, { responseType: 'text' });
  }

  updatePrecio(id: string, precios: Precios): Observable<string> {
    return this.httpClient.put(`${this.url}/precios/${id}`, precios, { responseType: 'text' });
  }

  deletePrecio(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/precios/${id}`, { responseType: 'text' });
  }
}