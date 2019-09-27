import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../model/usuario'; 


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

///// --------- Imports My Custom Models Class ------------

import { Perfil } from '../model/perfil';
import * as staticSettings from '../model/config';
import { MenuServicio } from '../model/menu_servicio';
import { Sub_Menu_Servicio } from '../model/sub_menu_servicio'; 
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PerfilOpcionService { 


        
  constructor( private http: HttpClient ) { }
  
  getAllMenus() : Observable<any> { 
     //Http request-
	 return this.http.get<any>(staticSettings.URL_MENUS+'cargaropciones')
   .pipe(
      catchError(this.handleError('getAllMenus',[]))
    );

  }

  getAllSubMenus() : Observable<any>{
     //Http request-
	 return this.http.get<Perfil[]>(staticSettings.URL_MENUS+"cargarsubopcionestodas")
   .pipe(
      catchError(this.handleError('getOpciones',[]))
    );

  }


	getOpciones () : Observable<Perfil[]> { 


	 //Http request-
	 return this.http.get<Perfil[]>(staticSettings.URL_OPTIONS_PPAL+"/1")
     .pipe(
        catchError(this.handleError('getOpciones',[]))
      );

}


	getOpcionesServicio(id : number) : Observable<any> {

		return this.http.get(staticSettings.URL_SERVICIO+"/"+id)
        .pipe(
            catchError(this.handleError('getOpcionesServicio',[]))
          );

	}


    getSubOpcionesServicio(iduser : number, idmenu : number) : Observable<any> {

        return this.http.get(staticSettings.URL_SBSERVICIO+"/"+iduser+"/"+idmenu)
        .pipe(
            catchError(this.handleError('getSubOpcionesServicio',[]))
          );

    }

    accesoUsuario( user : string, passw : string ) : Observable<Usuario[]> {

         const url = staticSettings.URL_ACCESOUSER+"/"+user+"/"+passw;   
                   return this.http.get<Usuario[]>(url).pipe(
            catchError(this.handleError('accesoUsuario',[]))
          );

    }


    crearMenu( nombre : string,  icono: string) : Observable<MenuServicio[]>{

      let urlSearchParams = new URLSearchParams();
  
      urlSearchParams.append('name',''+nombre);
      urlSearchParams.append('icon',''+icono);
    
      let body = urlSearchParams.toString();
  
      return this.http.post<MenuServicio[]>(staticSettings.URL_MENUS+'crearMain',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
              .pipe(
                catchError(this.handleError('crearMenu',[]))
                );
  
    }
    

    crearSubMenu( nombre : string,  icono: string  ,menu_servicio: MenuServicio ,acceso :string) : Observable<Sub_Menu_Servicio[]>{

      let urlSearchParams = new URLSearchParams();
  
      urlSearchParams.append('name',''+nombre);
      urlSearchParams.append('icon',''+icono);
      urlSearchParams.append('menu',''+menu_servicio);
      urlSearchParams.append('acces',''+acceso);
      let body = urlSearchParams.toString();
  
      return this.http.post<Sub_Menu_Servicio[]>(staticSettings.URL_MENUS+'crearSubmain',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
              .pipe(
                catchError(this.handleError('crearSubMenu',[]))
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


}
