import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';

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

  constructor( private route: ActivatedRoute,private cargaSesion: PerfilOpcionService ) { }

   ngOnInit() {


      this.usuario = window.localStorage.getItem("usuario");
      var respuesta = this.cargaSesion.accesoUsuario(this.nombre,this.pass);

      console.log(respuesta);
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
