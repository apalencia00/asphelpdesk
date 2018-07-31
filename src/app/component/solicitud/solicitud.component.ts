import { Component, OnInit }   from '@angular/core';
import { Observable }          from 'rxjs/Rx';
import { MatMenuModule }       from '@angular/material/menu';
import { PerfilOpcionService }  from '../../service/perfil-opcion.service';

@Component({
  selector    : 'app-solicitud',
  templateUrl : './solicitud.component.html',
  styleUrls   : ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {


	show:  boolean = false;
	showh: boolean = false;
  perfil_heldesk;
  perfil_sbheldesk;

	public loading = true;

  constructor( private opcion : PerfilOpcionService ) { }

  ngOnInit() {
    this.opcion.getOpcionesServicio().subscribe(p=>this.perfil_heldesk = p);
    
  	let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());

  }

  clickHandlerSubMenu(id : number) {

    this.opcion.getSubOpcionesServicio(id).subscribe(a=>this.perfil_sbheldesk = a);

  }

  loadPage(){
  	this.loading = false;
  }

}
