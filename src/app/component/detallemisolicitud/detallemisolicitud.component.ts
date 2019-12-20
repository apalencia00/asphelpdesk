import { Component, OnInit, Directive, Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { DISABLED } from '@angular/forms/src/model';
import * as Pusher from 'node_modules/pusher-js/dist/web/pusher.js';
import { environment } from 'src/environments/environment';
import { PusherService } from 'src/app/service/pusher.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detallemisolicitud',
  templateUrl: './detallemisolicitud.component.html', 
  styleUrls: ['./detallemisolicitud.component.css'] 
})

@Directive({
  selector: '[disableControl]' 
})

export class DetallemisolicitudComponent implements OnInit { 

  pusher: Pusher;
  channel: any;
  respuesta_acceso : any;


 step = 0;
 soypipe : string = "";
 firstFormGroup    : FormGroup;
 datos          : any;
 numservicio    : any;
 fechaapertura  : any;
 sucursal       : any;
 direccion      : any;
 obs            : any;
 tecnico        : any;
 identificacion : any;
 asunto         : any;

 respt_qr : any;



  constructor(private router : Router,private route: Router,private _formBuilder: FormBuilder,private detalleserv : DetalleIncidenciaService,private pusherService: PusherService) { 

    this.pusher = new Pusher(
      environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });

    
    this.channel = this.pusher.subscribe('response-access');
    console.log(this.channel);


  }

  


  ngOnInit() {

    //this.pusher.connect();
    


    this.channel.bind('event-response', data =>{
      this.respt_qr = data;
      var json = JSON.parse(this.respt_qr);
      console.log(json.descripcion);
        Swal.fire(
          'Evento de Aplicacion',
          json.descripcion,
          json.estado
        )

        //this.pusher.disconnect();
        //this.channel.unbind();

    });

 
    
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id); 

     //console.log("aaa"+localStorage.getItem("token"));
     var id = Number(window.localStorage.getItem("token"));
     console.log(id);

     if ( id == 0 ) {

      
      window.localStorage.removeItem("token");
      window.localStorage.clear();
      this.router.navigate(['/']);

     }  

    this.firstFormGroup = this._formBuilder.group({

      numservicio      : [''],
      fechaapertura    : [''],
      sucursal         : [''],
      direccion        : [''],
      obs              : [''],
      tecnico          : '',
      identificacion   : [''],
      asunto           : ''

        });


    var myhurl = this.route.url;
    var arrayDeCadenas = myhurl.split("/");
    this.soypipe = arrayDeCadenas[4];

    this.detalleserv.consultarvisita(this.soypipe).subscribe(r => {
        
      this.datos = r;
      console.log(this.datos);

      if ( this.datos != null ){

        this.numservicio      = this.datos.servicio; 
        this.fechaapertura    = this.datos.fecha;
        this.sucursal         = this.datos.sucursal;
        this.direccion        = this.datos.direccion; 
        this.obs              = this.datos.observacion;
        this.tecnico          = this.datos.asunto;
        this.identificacion   = this.datos.direccion;
        this.asunto           = this.datos.asunto;
      }
      

    });

  }



}
