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

import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: Pusher;
  channel: any;

  

  private _endPoint          = staticSettings.URL_INCIDENTE+'notifica';
  private _listendPoint      = staticSettings.URL_INCIDENTE+'notifica_listar';
  private _listendPointseg   = staticSettings.URL_INCIDENTE+'notifica_listar_seguridad';
  private _pointAcceso       = staticSettings.URL_INCIDENTE+'controlacceso';

  constructor( private http : HttpClient, private notifica : PerfilOpcionService ) {

    
   
   }
  

 

  

    get( dato : string ) : Observable<any> {
      return this.http.get<any>(`${this._endPoint}/${dato}`)
      .map(res => dato = res);
    }

    list_asignado (dato : string ): Observable<any> {
      return this.http.get(`${this._listendPoint}/${dato}`)
      .map(res => <any[]> res);
    }

    list_asignado_seguridad (dato : string ): Observable<any> {
      return this.http.get(`${this._listendPointseg}/${dato}`)
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

    getAcceso(idservicio : string, qr : string) : Observable<any> {

         return this.http.get<any>(this._pointAcceso+'/q1/'+idservicio+"/q2/"+qr+'/verifica').
        pipe(
          catchError(this.handleError('getAcceso',[]))
        )


    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

}
