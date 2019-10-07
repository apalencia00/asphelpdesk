import { Component, OnInit, ViewChild}                   from '@angular/core';
import { Observable }                         from 'rxjs/Rx';
import { MatMenuModule }                      from '@angular/material/menu';
import { PerfilOpcionService }                from '../../service/perfil-opcion.service';

@Component({
  selector    : 'app-solicitud',
  templateUrl :   './solicitud.component.html', 
  styleUrls   : ['./solicitud.component.css']

  
})


export class SolicitudComponent implements OnInit {
  
	show:  boolean = false;
	showh: boolean = false;
  perfil_heldesk;
  perfil_sbheldesk;
  
  validapermiso = true;
  
	public loading = true;
  
  constructor( private opcion : PerfilOpcionService ) { }
  
  ngOnInit() {

    
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id);
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
