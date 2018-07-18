import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  baseUrl = environment.apiUrl;

  private testUrl = `http://localhost:3000`;

  private testUrlApi = `https://localhost:5001/api`;

  constructor(private _http: HttpClient) { }


  getVehiculos(filter?: string): Observable<any[]> {
    if (filter == null || filter === '') {
      return this._http.get<any[]>(`${this.testUrlApi}/vehiculos`);
    }
    return this._http.get<any[]>(`${this.testUrlApi}/vehiculos/criterio/` + filter);
  }

  getSucursales(filter?: string): Observable<any[]> {
    if (filter == null || filter === '') {
      return this._http.get<any[]>(`${this.testUrlApi}/sucursales`);
    }
    return this._http.get<any[]>(`${this.testUrlApi}/sucursales/criterio/` + filter);
  }

  getChoferes(filter: string): Observable<any[]> {
    if (filter == null || filter === '') {
      return this._http.get<any[]>(`${this.testUrlApi}/colaboradores/tipo/1`);
    }
    return this._http.get<any[]>(`${this.testUrlApi}/colaboradores/criterio/` + filter);
  }

  getAuxiliares(filter: string): Observable<any[]> {
    if (filter == null || filter === '') {
      return this._http.get<any[]>(`${this.testUrlApi}/colaboradores/tipo/2`);
    }
    return this._http.get<any[]>(`${this.testUrlApi}/colaboradores/criterio/` + filter);
  }

  getTiposTransporte(): Observable<any[]> {
    return this._http.get<any[]>(`${this.testUrl}/tiposTransporte`);
  }

  createTransporte(transporte: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post<any>(`${this.testUrl}/transportes`, transporte, httpOptions);
  }

  getTransporte(id: any): Observable<any> {
    return this._http.get<any>(`${this.testUrl}/transportes/${id}`);
  }

  // para el autocomplete
  getTransportes(filter: string): Observable<any[]> {
    return this._http.get<any[]>(`${this.testUrl}/transportes`);
  }

  // para la búsqueda de Lista de Transportes
  searchTransportes(transporte: any): Observable<any[]> {
    return this._http.get<any[]>(`${this.testUrl}/transportes`);
  }

}
