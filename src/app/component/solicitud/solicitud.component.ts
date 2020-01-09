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
  numeroservicio : any;
  validapermiso = true;
  ususario_sesion  : string; 
  
  public loading = true;
  
  @ViewChild(BienvenidoComponent) bienvenidoComponent;
  
  constructor( private opcion : PerfilOpcionService, private pusherService: PusherService, private login: PerfilOpcionService ) { }
  
  ngOnInit() {
    
    window.localStorage.getItem("usuario");
   

    this.pusherService.list_asignado("T").subscribe(
      res => {
        this.lista_incidente = res; 
      
        for (var i =0; i<=this.lista_incidente.length-1; i++){
           this.numeroservicio = this.lista_incidente[i].num_servicio;
          }
        console.log(this.numeroservicio);
      });


    
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
