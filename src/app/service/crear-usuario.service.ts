

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as staticSettings from '../model/config';
import { T } from '@angular/core/src/render3';
import { ProfileUser } from '../model/profileuser';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
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


export class CrearUsuarioService {

  constructor( private http: HttpClient  ) { }



  listarUsuarios() : Observable<Usuario[]>{

    return this.http.get<Usuario[]>(staticSettings.URL_USUARIO+'listar/')
    .pipe(
      catchError(this.handleError('listarUsuarios',[]))
    )

  }


  cargarUsuarioPerfil() : Observable<ProfileUser[]>{

    return this.http.get<ProfileUser[]>(staticSettings.URL_USUARIO+'UserProfile/')
    .pipe(
      catchError(this.handleError('cargarUsuarioPerfil',[]))
    )

  }
  
  crearUsuario(tipoide : number, identificacion : string, usuario : string, nombre : string,  apellido: string, perfil : number, estado: string) : Observable<Usuario[]>{

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('tipodoc',''+tipoide);
    urlSearchParams.append('documento',''+identificacion); 
    urlSearchParams.append('usuario',''+usuario);
    urlSearchParams.append('nombre',''+nombre);
    urlSearchParams.append('apellido',''+apellido);
    urlSearchParams.append('perfil',''+perfil);
    urlSearchParams.append('estado', ''+estado);
    
    let body = urlSearchParams.toString();

    return this.http.post<Usuario[]>(staticSettings.URL_USUARIO+'crear',
    body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
            .pipe(
              catchError(this.handleError('crearUsuario',[]))
              );


  }

  eliminarUsuario(id_documento:any): Observable<any> {

    return this.http.delete(staticSettings.URL_USUARIO+'1/eliminar/'+id_documento)
      .pipe(
        catchError(this.eliminarUsuario)
      );
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

  cargaDatosUsuario(documento :string) : Observable<any[]>{
    

    let urlSearchParams = new URLSearchParams();

    let body = urlSearchParams.toString();

    return this.http.get<any>(staticSettings.URL_USUARIO+'consultarusuario/'+documento).
        pipe(
          catchError(this.handleError('',[]))
        )

  }


  
  cargaPerfilUsuario() : Observable<any[]>{
    

    let urlSearchParams = new URLSearchParams();


    let body = urlSearchParams.toString();

    return this.http.get<any>(staticSettings.URL_USUARIO+'cargaPerfil'+[]).
        pipe(
          catchError(this.handleError('cargarPerfilUsuario',[]))
        )

  }

  crearTecnico(tipo_identificacion : any,documento   : string ,nombre   : string ,apellido : string, celular:string,personal:string,extension:string,rol:string): Observable<any[]>{
 
    let urlSearchParams = new URLSearchParams();
  
    urlSearchParams.append('tpide',''+tipo_identificacion);
    urlSearchParams.append('doc', documento); 
    urlSearchParams.append('nombre', nombre);
    urlSearchParams.append('apellido', apellido);
    urlSearchParams.append('celular', celular);
    urlSearchParams.append('personal',personal);
    urlSearchParams.append('ext', extension);
    urlSearchParams.append('tipo_cargo',''+rol);
  
    
    let body = urlSearchParams.toString();
    return this.http.post<any>(staticSettings.URL_TECNICOS+'reg_tecnico',
    body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
            .pipe(
              catchError(this.handleError('crearTecnico',[]))
              );
  
  }
  

  actualizaDatosUsuario(documento :string,nombre:string,apellido:string,estado:string,perfil:number): Observable<any[]>{

    let urlSearchParams = new URLSearchParams();


    urlSearchParams.append('documento',''+documento);
    urlSearchParams.append('nombre',''+nombre);
    urlSearchParams.append('apellido',''+apellido);
    urlSearchParams.append('estado',''+estado);
    urlSearchParams.append('perfil',''+perfil);

    let body = urlSearchParams.toString();


    return this.http.put<any>(staticSettings.URL_USUARIO+'actualizar',body, 
    { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
    .pipe(
      catchError(this.handleError('actualizaDatosUsuario',[]))
      );

  
  }





}
