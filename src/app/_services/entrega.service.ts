import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transporte } from '../_models/Transporte';
import { Sucursal } from '../_models/Sucursal';
import { Cliente } from '../_models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  baseUrl = environment.apiUrl;
  private testUrlApi = `https://localhost:5001/api`;

  constructor(private _http: HttpClient) { }

  getTransportes(filter?: string): Observable<Transporte[]> {
    if (filter == null || filter === '') {
      return this._http.get<Transporte[]>(`${this.testUrlApi}/transportes`);
    }
    return this._http.get<Transporte[]>(`${this.testUrlApi}/transportes/criterio/` + filter);
  }

  getRemitentes(filter: string): Observable<Cliente[]> {
    if (filter == null || filter === '') {
      return this._http.get<Cliente[]>(`${this.testUrlApi}/clientes/tipo/1`);
    }
    return this._http.get<Cliente[]>(`${this.testUrlApi}/clientes/criterio/` + filter);
  }

  getDestinatarios(filter: string): Observable<Cliente[]> {
    if (filter == null || filter === '') {
      return this._http.get<Cliente[]>(`${this.testUrlApi}/clientes/tipo/2`);
    }
    return this._http.get<Cliente[]>(`${this.testUrlApi}/clientes/criterio/` + filter);
  }

  getSucursales(filter?: string): Observable<Sucursal[]> {
    if (filter == null || filter === '') {
      return this._http.get<Sucursal[]>(`${this.testUrlApi}/sucursales`);
    }
    return this._http.get<Sucursal[]>(`${this.testUrlApi}/sucursales/criterio/` + filter);
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
