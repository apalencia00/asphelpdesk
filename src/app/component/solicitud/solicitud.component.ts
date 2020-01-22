import { Component, OnInit, ViewChild}                   from '@angular/core';
import { Observable }                         from 'rxjs/Rx';
import { MatMenuModule }                      from '@angular/material/menu';
import { PerfilOpcionService }                from '../../service/perfil-opcion.service';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { Incidente } from 'src/app/model/incidente';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PusherService } from 'src/app/service/pusher.service';
import { Router } from "@angular/router";

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
  dataSource: any;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  numeroservicio : any;
  validapermiso = true;
  ususario_sesion  : string; 
  usuario : any;
  public loading = true;
  contador : any;
  badgeCounter : number;
  ide : any;

  @ViewChild(BienvenidoComponent) bienvenidoComponent;
  
  constructor(private route : Router, private opcion : PerfilOpcionService, private pusherService: PusherService, private login: PerfilOpcionService ) { }
  
  ngOnInit() {
    
      this.pusherService.list_asignado("T").subscribe(
      res => {
        this.lista_incidente = res; 
      
        for (var i =0; i<=this.lista_incidente.length-1; i++){
           this.numeroservicio = this.lista_incidente[i].num_servicio;
           this.badgeCounter = this.lista_incidente.length;
           console.log(this.badgeCounter); 
          }
        console.log(this.numeroservicio);
      });

      this.usuario = window.localStorage.getItem("usuario");

    
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    console.log(id);

    this.opcion.getNameSesion(id).subscribe(res=>{
      this.ususario_sesion = res.nombre;
      console.log(this.ususario_sesion);
    });

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
  
  incrementCount() {
    this.badgeCounter++;
  }

  decreaseCount() {
    if(this.badgeCounter < 0)
     return;
    this.badgeCounter++;
  }

  resetCount() {
    this.badgeCounter = 0;
  }
  


  cerrarSession(){

    this.login.cerrarSessionOnRedis(this.ide).subscribe(res => {
      let responsesf = res;
      console.log(responsesf)
     
    });
    window.localStorage.clear();
    window.localStorage.removeItem("token");
    this.route.navigate(['/']);
    
  

}

  
}
