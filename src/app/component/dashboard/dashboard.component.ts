import { Component, OnInit, ViewChild } from '@angular/core';
import { Perfil } from '../../model/perfil';
import { PerfilOpcionService }  from '../../service/perfil-opcion.service';
import { Observable } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  
  
  error: any; 
  perfile;
  perfil : Perfil[] = [];
  public loading = true;
  usuario : any;

  constructor( private opcion: PerfilOpcionService ) {  }

  ngOnInit() {

    this.usuario = window.localStorage.getItem("usuario");
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));

    
    //console.log(id); 
  	 this.opcion.getOpciones().subscribe(p=>this.perfil = p);
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());
 
 
  }

    loadPage(){
    this.loading = false;
  }																																			
 
}

