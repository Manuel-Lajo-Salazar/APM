import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from '../_models/Vehiculo';
import { Sucursal } from '../_models/Sucursal';
import { Colaborador } from '../_models/Colaborador';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  baseUrl = environment.apiUrl;
  private testUrlApi = `https://localhost:5001/api`;

  constructor(private _http: HttpClient) { }

  getVehiculos(filter?: string): Observable<Vehiculo[]> {
    if (filter == null || filter === '') {
      return this._http.get<Vehiculo[]>(`${this.testUrlApi}/vehiculos`);
    }
    return this._http.get<Vehiculo[]>(`${this.testUrlApi}/vehiculos/criterio/` + filter);
  }

  getSucursales(filter?: string): Observable<Sucursal[]> {
    if (filter == null || filter === '') {
      return this._http.get<Sucursal[]>(`${this.testUrlApi}/sucursales`);
    }
    return this._http.get<Sucursal[]>(`${this.testUrlApi}/sucursales/criterio/` + filter);
  }

  getChoferes(filter: string): Observable<Colaborador[]> {
    if (filter == null || filter === '') {
      return this._http.get<Colaborador[]>(`${this.testUrlApi}/colaboradores/tipo/1`);
    }
    return this._http.get<Colaborador[]>(`${this.testUrlApi}/colaboradores/criterio/` + filter);
  }

  getAuxiliares(filter: string): Observable<Colaborador[]> {
    if (filter == null || filter === '') {
      return this._http.get<Colaborador[]>(`${this.testUrlApi}/colaboradores/tipo/2`);
    }
    return this._http.get<Colaborador[]>(`${this.testUrlApi}/colaboradores/criterio/` + filter);
  }


  // requests para Transporte

  createTransporte(transporte: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<any>(`${this.testUrlApi}/transportes/create`, transporte, httpOptions);
  }

  updateTransporte(transporte: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put<any>(`${this.testUrlApi}/transportes/update`, transporte, httpOptions);
  }

  // para recuperar un Transporte específico según su id
  getTransporte(id: Number): Observable<any> {
    return this._http.get<any>(`${this.testUrlApi}/transportes/${id}`);
  }

  // para los resultados de Busqueda en Lista de Transportes
  searchTransportes(transporteCriteria: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<any[]>(`${this.testUrlApi}/transportes/criterio`, transporteCriteria, httpOptions);
  }

  getTransportes(filter?: string): Observable<any[]> {
    if (filter == null || filter === '') {
      return this._http.get<any[]>(`${this.testUrlApi}/transportes`);
    }
    return this._http.get<any[]>(`${this.testUrlApi}/transportes/criterio/` + filter);
  }

}
