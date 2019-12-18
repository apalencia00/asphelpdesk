import { Component, OnInit, ViewChild}                   from '@angular/core';
import { Observable }                         from 'rxjs/Rx';
import { MatMenuModule }                      from '@angular/material/menu';
import { PerfilOpcionService }                from '../../service/perfil-opcion.service';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { Incidente } from 'src/app/model/incidente';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PusherService } from 'src/app/service/pusher.service';

@Component({
  selector    : 'app-solicitud',
  templateUrl :   './solicitud.component.html', 
  styleUrls   : ['./solicitud.component.css']

  
})


export class SolicitudComponent implements OnInit {
  
  lista_incidente : Incidente[];
  respuesta : any;
	show:  boolean = false;
	showh: boolean = false;
  perfil_heldesk;
  perfil_sbheldesk;
  usuario_sesion  : any;
  dataSource: any;
  
  @ViewChild(MatPaginator) paginator : MatPaginator;

  validapermiso = true;
  ususario_sesion  : string;
  
  public loading = true;
  
  @ViewChild(BienvenidoComponent) bienvenidoComponent;
  
  constructor( private opcion : PerfilOpcionService, private pusherService: PusherService, private login: PerfilOpcionService ) { }
  
  ngOnInit() {
    
    this.usuario_sesion = window.localStorage.getItem("usuario");
    console.log(this.usuario_sesion);

   /*  this.pusherService.list_asignado_seguridad("T").subscribe(
      res => {
        this.lista_incidente = res; 
        this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
        this.dataSource.paginator = this.paginator;
        for (var i =0; i<=this.lista_incidente.length-1; i++){
          var solicitante = this.lista_incidente[i].identificacion_solictante;
        }

      }); */

    this.ususario_sesion = window.localStorage.getItem("usuario");
    console.log(this.ususario_sesion);
    

    
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    console.log(id);
    this.opcion.getOpcionesServicio(id).subscribe(p=>this.perfil_heldesk = p);
    
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());
    
  }
  
  clickHandlerSubMenu(idus : number,idmenu) {
    var id = Number(localStorage.getItem("token"));
    this.opcion.getSubOpcionesServicio(id,idmenu).subscribe(a=>this.perfil_sbheldesk = a);
    
  }
  
  loadPage(){
    this.loading = false;
  }
  
  getViewContexto(id : string){
    
    
    
  }
  
}
