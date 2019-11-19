import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {

	public loading = true;
  public nombre = '';
  public pass = '';
  usuario : any;
  perfilUser: any;
  @ViewChild(BienvenidoComponent) loginComponent;


  constructor( private route: ActivatedRoute,private cargaSesion: PerfilOpcionService,  private router : Router) { }

   ngOnInit() {



      this.usuario = window.localStorage.getItem("usuario");
      var acceso = this.cargaSesion.accesoUsuario(this.nombre,this.pass);
     this.perfilUser = window.localStorage.getItem("perfilUsuario");
    console.log(this.perfilUser);

    if(this.perfilUser != 1000){
      console.log("Entrando aqui");
        this.router.navigate(['/error']);
      }

      
      console.log(acceso);
  	 //console.log("aaa"+localStorage.getItem("token"));
     var id = Number(localStorage.getItem("token"));
     //console.log(id); 
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());

  }

    loadPage(){
    this.loading = false;
  }									

}
