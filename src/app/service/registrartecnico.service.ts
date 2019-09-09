import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import * as staticSettings from '../model/config';
import { of } from 'rxjs';
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
export class RegistrartecnicoService {

  constructor(private http: HttpClient) { }

  
crearTecnico(tipo_identificacion : string,documento   : string ,nombre   : string ,apellido : string, extension : string,direccion : string,rol : string): Observable<any[]>{

  return this.http.get<any[]>(staticSettings.URL_TECNICOS+'registrarTecnico').
  pipe(
    catchError(this.handleError('crearTecnico',[]))
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
