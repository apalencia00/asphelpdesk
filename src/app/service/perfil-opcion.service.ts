import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';

///// --------- Imports My Custom Models Class ------------

import { Perfil } from '../model/perfil';
import * as staticSettings from '../model/config';
import { MenuServicio } from '../model/menu_servicio';
import { Sub_Menu_Servicio } from '../model/sub_menu_servicio'; 

@Injectable()
export class PerfilOpcionService { 

	
	constructor( private http: HttpClient ) { }    

	getOpciones () : Observable<any> { 


	 //Http request-
	 return this.http.get(staticSettings.URL_OPTIONS_PPAL+"/1")
	 		.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
		   

}

	getOpcionesServicio() : Observable<any> {

		return this.http.get(staticSettings.URL_SERVICIO+"/1")
			 		.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
			   

	}

	getOpcionesAlternasServicio() : Observable<any>{

		return this.http.get(staticSettings.URL_SERVICIO_SECUNDARIO)
			 		.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
		
	}

	private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }

	


}
