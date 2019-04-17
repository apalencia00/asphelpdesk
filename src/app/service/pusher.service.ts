import { Injectable } from '@angular/core';
import * as Pusher from 'node_modules/pusher-js/dist/web/pusher.js';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import * as staticSettings from '../model/config';
import { PerfilOpcionService } from './perfil-opcion.service';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/mapTo'; 
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';



@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: Pusher;
  channel: any;

  

  private _endPoint = staticSettings.URL_INCIDENTE+'notifica';
  private _listendPoint = staticSettings.URL_INCIDENTE+'notifica_listar';

  constructor( private http : HttpClient, private notifica : PerfilOpcionService ) {

    this.pusher = new Pusher(
      environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });

    this.channel = this.pusher.subscribe('my-channel');
   
   }
  

   getChannel () {
    return this.channel;
  }

    // any time it is needed we simply call this method
    getPusher() {
      return this.pusher;
    }

  

    get( dato : string ) : Observable<any> {
      return this.http.get<any>(`${this._endPoint}/${dato}`)
      .map(res => dato = res);
    }

    list_asignado (dato : string ): Observable<any> {
      return this.http.get(`${this._listendPoint}/${dato}`)
      .map(res => <any[]> res);
    }

    /**
     * Create new employee
     * @param param
     * @return Observable<any> with the id
     */
    create(param: any): Observable<any> {
      return this.http.post(this._endPoint, param)
      .map(res => <any> res);
    }

    /**
     * Remove an employee
     * @param employee to remove
     * @return Observable<any> the employee just removed
     */
    delete(employee: any): Observable<any> {
      return this.http.delete(`${this._endPoint}/${employee.id}`)
      .mapTo(employee);
    }

}
