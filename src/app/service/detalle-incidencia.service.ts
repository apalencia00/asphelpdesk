import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import * as staticSettings from '../model/config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded,application/json',
    'responseType':  'ResponseContentType.Json',
    'withCredentials': 'false',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding'

  })
};

@Injectable({
  providedIn: 'root' 
})
export class DetalleIncidenciaService {

  constructor( private http: HttpClient ) { }

  cargaDatosSolicitud(servicio : string) : Observable<any[]>{

    return this.http.get<any[]>(staticSettings.URL_INCIDENTE+'detalle/'+servicio).
        pipe(
          catchError(this.handleError('cargaDatosSolicitud',[]))
        )

  }

  cargaDatosPersonalTecnico() : Observable<any[]> {

    return this.http.get<any[]>(staticSettings.URL_TECNICOS+'listar').pipe(
        catchError(this.handleError('cargaDatosPersonalTecnico',[]))
    )

  }

  consultarvisita(osservicio : any) : Observable<any> {

    return this.http.get<any[]>(staticSettings.URL_VISITA_SERVICIO+'/'+osservicio).pipe(
      catchError(this.handleError('consultarvisita',[]))
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
