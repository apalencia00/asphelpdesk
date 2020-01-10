

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import * as staticSettings from '../model/config';
import { Incidente } from '../model/incidente';
import { of } from 'rxjs';
import { Asunto } from '../model/asunto';
import { AuditoriaIncidente } from '../model/auditoriaincidente';
import { CierreServicio } from '../model/cierreservicio';

const yourHeadersConfig = {

  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded,application/json',
    'responseType':  'ResponseContentType.Json',
    'withCredentials': 'false',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding'

  })

}

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
export class CrearIncidenteService {

  constructor( private http: HttpClient ) { }

  cargaAsunto (id : any) : Observable<Asunto[]>{

    return this.http.get<Asunto[]>(staticSettings.URL_INCIDENTE+'cargaasunto/'+id).
        pipe(
          catchError(this.handleError('cargaAsunto',[]))
        )

  }

  listarServiciobyID(id : number) : Observable<Incidente[]>{

    return this.http.get<Incidente[]>(staticSettings.URL_INCIDENTE+'listarbyid/'+id)
    .pipe(
      catchError(this.handleError('listarServiciobyID',[]))
    )

  }

  listarServicioByCriterio(oper: number,criterio : string) : Observable<Incidente[]>{

    return this.http.get<Incidente[]>(staticSettings.URL_INCIDENTE+'listarbycriterio/'+oper+'/'+criterio)
    .pipe(
      catchError(this.handleError('listarServicioByCriterio',[]))
    )

  }

  listarServicio() : Observable<any[]> {

    return this.http.get<any[]>(staticSettings.URL_INCIDENTE+'listar')
    .pipe(
      catchError(this.handleError('listarServicio',[]))
    )

  }

  listarHistorialPuntosVenta(dato : any) : Observable<any[]> {

    return this.http.get<any[]>(staticSettings.URL_PUNTOVENTA+'listarservpv/'+dato)
    .pipe(
      catchError(this.handleError('listarHistorialPuntosVenta',[]))
    )

  }

  consultarpuntoventabyos(dato : String) : Observable<any[]> {

    return this.http.get<any[]>(staticSettings.URL_INCIDENTE+'getpuntoventa/'+dato)
    .pipe(
      catchError(this.handleError('listarHistorialPuntosVenta',[]))
    )

  }

  buscarPersona  ( dato : String ) : Observable<any[]>{

    return this.http.get<any[]>(staticSettings.URL_VENDOR+'/'+dato).
      pipe(
        catchError(this.handleError('buscarPersona',[]))


    )

  }

  buscarPV ( dato: String ) : Observable<any>{ 

    return this.http.get<any>(staticSettings.URL_PUNTO+'/'+dato).
      pipe(
        catchError(this.handleError('buscarPV',[]))


    )


  }

  

  crearIncidente ( incidente : Incidente ) : Observable<any> {

    let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('num_servicio',    incidente.num_servicio);
        urlSearchParams.append('solicitante',  ''+incidente.fk_tipo_solicitante);
        urlSearchParams.append('cedula',          incidente.identificacion_solictante);
        urlSearchParams.append('direccion',       incidente.direccion_servicio);
        urlSearchParams.append('sucursal',        incidente.sucursal);
        urlSearchParams.append('recepcion',    ''+incidente.tipo_solicitud);
        urlSearchParams.append('asunto',       ''+incidente.tipo_asunto);
        urlSearchParams.append('punto',           incidente.punto_movil_fijo);
        urlSearchParams.append('descripcion',     incidente.descripcion);
        urlSearchParams.append('fechaser',        ''+incidente.fechaser);
        urlSearchParams.append('imagen',          incidente.archivo);
        urlSearchParams.append('usuario',         ''+incidente.fk_usuario);
        urlSearchParams.append('estado',          'A');
        urlSearchParams.append('idepunto',       ''+incidente.ide_punto);

    let body = urlSearchParams.toString();
    
    return this.http.post(staticSettings.URL_INCIDENTE+'crear',
      
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded',
                                      
      )})
            .pipe(
              catchError(this.handleError('crearIncidente',[]))
              );

  }



  asignarServicio ( param : AuditoriaIncidente ) : Observable<any>{

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('urgencia', ''+param.tipo_urgencia);
    urlSearchParams.append('tecnico',  ''+param.tecnico_responsable);
    urlSearchParams.append('tipo_servicio',''+param.tipo_servicio);
    urlSearchParams.append('obs', param.obs);
    urlSearchParams.append('fecha_apertura', param.fecha_apertura);
    urlSearchParams.append('fecha_recepcion', param.fecha_apertura);
    urlSearchParams.append('numservicio', param.num_servicio);
    urlSearchParams.append('usuario', ''+param.fk_usuario);
   urlSearchParams.append('tecniconuevo',''+param.tecnico_nuevo)


    let body = urlSearchParams.toString();

    return this.http.post(staticSettings.URL_INCIDENTE+'asignar',
      
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
            .pipe(
              catchError(this.handleError('asignarServicio',[]))
              );

  }
  

  cerrrarServicio ( param : CierreServicio) : Observable<any>{

    let urlSearchParams = new URLSearchParams();
    
    urlSearchParams.append('servicio', ''+param.nservicio);
    urlSearchParams.append('usuario', ''+param.usuario);
    urlSearchParams.append('descripcion',  ''+param.descripcionServicio);
    urlSearchParams.append('estado_serv', ''+param.estado_servicio);
    urlSearchParams.append('pendiente', ''+param.pendiente_sinservicio);
    urlSearchParams.append('inventario', ''+param.inventario);
    urlSearchParams.append('imei',  ''+param.imei);
    urlSearchParams.append('sim',''+param.simcard);
    urlSearchParams.append('operador',  ''+param.operador);


    let body = urlSearchParams.toString();

    return this.http.post(staticSettings.URL_INCIDENTE+'cerrar_servicio',
      
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
            .pipe(
              catchError(this.handleError('cerrarServicio',[]))
              );

  }

  agregarNotas( servicio : string ,obs : string ) : Observable<any>{

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("num_servicio", servicio);
    urlSearchParams.append("obs", obs);

    let body = urlSearchParams.toString();

    return this.http.post(staticSettings.URL_INCIDENTE+'agregarnota',
      
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
            .pipe(
              catchError(this.handleError('agregarNotas',[]))
              );

  }

  ultimoServicio() : Observable<any>{

    return this.http.get<any>(staticSettings.URL_INCIDENTE+'ultimo/').
      pipe(
        catchError(this.handleError('ultimoServicio',[]))


    )

  }

  exportExcel() : Observable<any>{

    return this.http.get<any>(staticSettings.URL_INCIDENTE+'listarbycriterio/2/A').
      pipe(
        catchError(this.handleError('exportExcel',[]))
      )

  }
  
  postFile(fileToUpload: File): Observable<any> {

    const endpoint = 'http://10.35.10.21:8035/api/vendor/subida';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(endpoint,formData )
      .pipe(
        catchError(this.handleError('postFile',[]))
      )

      }


   getDatosAplicaciones() : Observable<any[]> {

    return this.http.get<any[]>(staticSettings.URL_VENDOR).
    pipe(
      catchError(this.handleError('getDatosAplicaciones',[]))


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

export class SubirservicioService {

  constructor(private httpClient : HttpClient) { }

  

}