import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../_models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  baseUrl = environment.apiUrl;
  private testUrlApi = `https://localhost:5001/api`;

  constructor(private _http: HttpClient) { }

  getRemitentes(filter: string): Observable<Cliente[]> {
    if (filter == null || filter === '') {
      return this._http.get<Cliente[]>(`${this.testUrlApi}/Remitentes`);
    }
    return this._http.get<Cliente[]>(`${this.testUrlApi}/Remitentes/criterio/` + filter);
  }

  getDestinatarios(filter: string): Observable<Cliente[]> {
    if (filter == null || filter === '') {
      return this._http.get<Cliente[]>(`${this.testUrlApi}/Destinatarios`);
    }
    return this._http.get<Cliente[]>(`${this.testUrlApi}/Destinatarios/criterio/` + filter);
  }


  // requests para Entrega

  createEntrega(entrega: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<any>(`${this.testUrlApi}/entregas/create`, entrega, httpOptions);
  }

  createEntregaWithAttachment(entrega: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('entrega', entrega);
    formData.append('file', file);

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    return this._http.post<any>(`${this.testUrlApi}/entregas`, formData, httpOptions);
}

// create(cdsLicense: CdsLicense, licenseFile: File): Observable<string> {
//     const formData = new FormData();
//     formData.append('providerCdsLicense', JSON.stringify(cdsLicense));
//     formData.append('file', licenseFile);
//     return this.http.post(this.cdsLicenseApiUrl, formData, { responseType: 'text' });
// }

  updateEntrega(entrega: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put<any>(`${this.testUrlApi}/entregas/update`, entrega, httpOptions);
  }

  // para recuperar una Entrega específica según su id
  getEntrega(id: Number): Observable<any> {
    return this._http.get<any>(`${this.testUrlApi}/entregas/${id}`);
  }

  // para los resultados de Busqueda en Lista de Entregas
  searchEntregas(entregaCriteria: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<any[]>(`${this.testUrlApi}/entregas/criterio`, entregaCriteria, httpOptions);
  }

}
