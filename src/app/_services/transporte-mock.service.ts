import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from '../_models/Vehiculo';
import { Sucursal } from '../_models/Sucursal';
import { Colaborador } from '../_models/Colaborador';
import { Transporte } from '../_models/Transporte';

// @Injectable({
//     providedIn: 'root'
// })
@Injectable()
export class TransporteMockService {
    private testUrlApi = `http://localhost:3000`;

    constructor(private _http: HttpClient) { }

    getVehiculos(filter: string): Observable<Vehiculo[]> {
        return this._http.get<Vehiculo[]>(`${this.testUrlApi}/vehiculos`);
    }

    getSucursales(filter: string): Observable<Sucursal[]> {
        return this._http.get<Sucursal[]>(`${this.testUrlApi}/sucursales`);
    }

    getChoferes(filter: string): Observable<Colaborador[]> {
        return this._http.get<Colaborador[]>(`${this.testUrlApi}/choferes`);
    }

    getAuxiliares(filter: string): Observable<Colaborador[]> {
        return this._http.get<Colaborador[]>(`${this.testUrlApi}/auxiliares`);
    }


    // requests para Transporte (pendiente mapear al modelo específico de transporte)

    createTransporte(transporte: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post<any>(`${this.testUrlApi}/transportes`, transporte, httpOptions);
    }

    // no funciona con json-server
    updateTransporte(transporte: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post<any>(`${this.testUrlApi}/transportes`, transporte, httpOptions);
    }

    deleteTransporte(id: any): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this._http.put<any>(`${this.testUrlApi}/transportes/delete`, id, httpOptions);
      }
    
    // para recuperar un Transporte específico según su id
    getTransporte(id: Number): Observable<any> {
        return this._http.get<any>(`${this.testUrlApi}/transportes/${id}`);
    }

    // temporal: para obtener nuevo id, basado en el mayor id + 1
    // getTransportes(): Observable<any[]> {
    //   return this._http.get<any[]>(`${this.testUrlApi}/transportes`);
    // }

    // para los resultados de Busqueda en Lista de Transportes
    searchTransportes(transporteCriteria: any): Observable<any[]> {
        return this._http.get<any[]>(`${this.testUrlApi}/transportes`);
    }

    getTransportes(filter: string): Observable<Transporte[]> {
        return this._http.get<Transporte[]>(`${this.testUrlApi}/transportes`);
    }

}
