import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Empresa } from '../interfaces/empresas';
import { SERVER_URL } from '../constants';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private url = SERVER_URL;
  private empresas$: Subject<Empresa[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshEmpresas() {
    this.httpClient.get<Empresa[]>(`${this.url}/empresas`)
      .subscribe(empresas => {
        this.empresas$.next(empresas);
      });
  }

  getEmpresas(): Subject<Empresa[]> {
    this.refreshEmpresas();
    return this.empresas$;
  }

  getEmpresa(id: string): Observable<Empresa> {
    return this.httpClient.get<Empresa>(`${this.url}/empresas/${id}`);
  }

  createEmpresa(empresa: Empresa): Observable<string> {
    return this.httpClient.post(`${this.url}/empresas`, empresa, { responseType: 'text' });
  }

  updateEmpresa(id: string, empresa: Empresa): Observable<string> {
    return this.httpClient.put(`${this.url}/empresas/${id}`, empresa, { responseType: 'text' });
  }

  deleteEmpresa(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/empresas/${id}`, { responseType: 'text' });
  }

  sendPost(body:FormData):Observable<any>{
    return this.httpClient.post(`${this.url}/uploads`,body)
  }
}
