import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../model/perfil';
import { PerfilOpcionService }  from '../../service/perfil-opcion.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  perfile;
  perfil : Perfil[] = [];
	public loading = true;

  constructor( private opcion: PerfilOpcionService ) {  }

  ngOnInit() {
  	 this.opcion.getOpciones().subscribe(p=>this.perfil = p);
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());
  }

    loadPage(){
    this.loading = false;
  }																																			

}
