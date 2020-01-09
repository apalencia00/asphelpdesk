import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Perfil } from '../../model/perfil';
import { PerfilOpcionService }  from '../../service/perfil-opcion.service';
import { Observable } from 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { Router } from '@angular/router';
import {MatToolbarModule, MatToolbar, MatToolbarRow} from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  error: any; 
  perfilUser : any;
  perfil : Perfil[] = [];
  public loading = true;
  usuario : any;
  @ViewChild ( BienvenidoComponent) loginComponent;
  @Input() color : "#1DE9B6" ;

  constructor( private opcion: PerfilOpcionService,  private router : Router ) {  }

  ngOnInit() {
    
 
    this.usuario = window.localStorage.getItem("usuario");
    this.perfilUser = window.localStorage.getItem("perfilUsuario");
    console.log(this.perfilUser);
    console.log(this.usuario);
    
    //console.log("aaa"+localStorage.getItem("token"));
   // var id = Number(localStorage.getItem("token"));
   if(this.perfilUser != 1000){
      console.log("Entrando aqui");
        this.router.navigate(['/error']);

      } 
    
    //console.log(id); 
  	 this.opcion.getOpciones().subscribe(p=>this.perfil = p);
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());
 
 
  }

    loadPage(){
    this.loading = false;
  }																																			
 
}

