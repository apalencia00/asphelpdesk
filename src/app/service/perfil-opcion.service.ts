import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../model/usuario'; 
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'application_developer_for_andres_palencia';


///// --------- Imports My Custom Models Class ------------

import { Perfil } from '../model/perfil';
import * as staticSettings from '../model/config';
import { MenuServicio } from '../model/menu_servicio';
import { Sub_Menu_Servicio } from '../model/sub_menu_servicio'; 
import { of, throwError } from 'rxjs';
import { UsuarioAsignado } from '../model/usuarioasignado';

@Injectable({ providedIn: 'root' })
export class PerfilOpcionService  { 

  private headers = new Headers({ 'Content-Type': 'application/json' });
        
  constructor( private http: HttpClient ) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  
  getAllMenus() : Observable<any[]> { 
     //Http request-
	 return this.http.get<any[]>(staticSettings.URL_MENUS+'cargaropciones')
   .pipe(
      catchError(this.handleError)
    );

  }

  permisosUsuario(documento : string) : Observable<any[]> { 
    //Http request-
  return this.http.get<any[]>(staticSettings.URL_MENUS+'permisos_usuario/'+documento)
  .pipe(
     catchError(this.handleError)
   );

 }

  getAllSubMenus() : Observable<any[]>{
     //Http request-
	 return this.http.get<Perfil[]>(staticSettings.URL_MENUS+"cargarsubopcionestodas")
   .pipe(
      catchError(this.handleError)
    );

  }


	getOpciones () : Observable<Perfil[]> { 


	 //Http request-
	 return this.http.get<Perfil[]>(staticSettings.URL_OPTIONS_PPAL+"/1")
     .pipe(
        catchError(this.handleError)
      );

}


	getOpcionesServicio(id : number) : Observable<any> {

		return this.http.get(staticSettings.URL_SERVICIO+"/"+id)
        .pipe(
            catchError(this.handleError) 
          );

	}


    getSubOpcionesServicio(iduser : number, idmenu : number) : Observable<any> {

        return this.http.get(staticSettings.URL_SBSERVICIO+"/"+iduser+"/"+idmenu)
        .pipe(
            catchError(this.handleError)
          );

    }

    accesoUsuario( user : string, passw : string ) : Observable<any> {

         const url = staticSettings.URL_ACCESOUSER+"/"+user+"/"+passw;   
                   return this.http.get<any>(url);

    }


    crearMenu( nombre : string,  icono: string) : Observable<MenuServicio[]>{

      let urlSearchParams = new URLSearchParams();
  
      urlSearchParams.append('nombre',''+nombre);
      urlSearchParams.append('icono',''+icono);
    
      let body = urlSearchParams.toString();
  
      return this.http.post<MenuServicio[]>(staticSettings.URL_PERFIL_MENU+'/crearmenu',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
              .pipe(
                catchError(this.handleError)
                );
  
    }
    

    crearSubMenu( nombre : string,  icono: string  ,menu_servicio: MenuServicio ,acceso :string) : Observable<any[]>{

      let urlSearchParams = new URLSearchParams();
  
      urlSearchParams.append('nombre',''+nombre);
      urlSearchParams.append('icono',''+icono);
      urlSearchParams.append('id_menu',''+menu_servicio);
      urlSearchParams.append('acceso',''+acceso);
      let body = urlSearchParams.toString();
  
      return this.http.post<any[]>(staticSettings.URL_PERFIL_MENU+'/crearsubmenu',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
              .pipe(
                catchError(this.handleError)
                );
  
    }

    asignarRolesPerfiles(idmenu : number, idsubmenu : number, documento : string) : Observable<any> {

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('idmenu',''+idmenu);
      urlSearchParams.append('idsubmenu',''+idsubmenu);
      urlSearchParams.append('documento',''+documento);
      let body = urlSearchParams.toString();
      
      return this.http.post<UsuarioAsignado[]>(staticSettings.URL_MENUS+'permisos',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
              .pipe(
                catchError(this.handleError)
                );

    }

    validarSessionOnRedis() : Observable<any> {

      return this.http.get(staticSettings.URL_REDIS+'/')
      .pipe(
          catchError(this.validarSessionOnRedis)
        );

       


    }

    cerrarSessionOnRedis(iddoc : any) : Observable<any> {
          
      return this.http.get(staticSettings.URL_REDIS_CLOSE+'/'+iddoc)
      .pipe(
          catchError(this.cerrarSessionOnRedis)
        );
    }

    getNameSesion(idtoken : number) : Observable<any> {

      return this.http.get(staticSettings.URL_PERFIL_MENU+'/sesionname/'+idtoken)
      .pipe(
          catchError(this.getNameSesion)
        );


    }

    eliminarMenu(id_submenu:any): Observable<any> {

      return this.http.delete(staticSettings.URL_PERFIL_MENU+'/eliminar/'+id_submenu)
        .pipe(
          catchError(this.eliminarMenu)
        );
    }


   
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to Swhat went wrong,
        console.error(
          `!ERROR EN CONEXION¡ ${error.status}, ` +
          ` ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    };



}
