import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Clinicas } from '../interfaces/clinicas';
import { SERVER_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ClinicasService {
  private url = SERVER_URL;
  private clinicas$: Subject<Clinicas[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshClinicas() {
    this.httpClient.get<Clinicas[]>(`${this.url}/clinicas`)
      .subscribe(clinicas => {
        this.clinicas$.next(clinicas);
      });
  }

  getClinicas(): Subject<Clinicas[]> {
    this.refreshClinicas();
    return this.clinicas$;
  }

  getClinica(id: string): Observable<Clinicas> {
    return this.httpClient.get<Clinicas>(`${this.url}/clinicas/${id}`);
  }

  createClinica(clinicas: Clinicas): Observable<string> {
    return this.httpClient.post(`${this.url}/clinicas`, clinicas, { responseType: 'text' });
  }

  updateClinica(id: string, clinicas: Clinicas): Observable<string> {
    return this.httpClient.put(`${this.url}/clinicas/${id}`, clinicas, { responseType: 'text' });
  }

  deleteClinica(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/clinicas/${id}`, { responseType: 'text' });
  }
}
