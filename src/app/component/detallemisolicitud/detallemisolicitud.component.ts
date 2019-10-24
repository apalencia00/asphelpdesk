import { Component, OnInit, Directive, Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-detallemisolicitud',
  templateUrl: './detallemisolicitud.component.html',
  styleUrls: ['./detallemisolicitud.component.css'] 
})

@Directive({
  selector: '[disableControl]'
})

export class DetallemisolicitudComponent implements OnInit {


 step = 0;
 soypipe : String = "";
 firstFormGroup    : FormGroup;
 datos          : any;
 numservicio    : String;
 fechaapertura  : any;
 sucursal       : String;
 direccion      : String;
 obs            : String;
 tecnico        : String;
 identificacion : String;
 asunto         : String;



  constructor(private router : Router,private route: Router,private _formBuilder: FormBuilder,private detalleserv : DetalleIncidenciaService) { }

  ngOnInit() {
    
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

      if ( this.datos != null ){

        this.numservicio      = this.datos.servicio; 
        this.fechaapertura    = this.datos.fecha;
        this.sucursal         = this.datos.sucursal;
        this.direccion        = this.datos.direccion; 
        this.obs              = this.datos.observacion;
        this.tecnico          = this.datos.nombre_tecnico;
        this.identificacion   = this.datos.identificacion;
        this.asunto           = this.datos.asunto;
      }
      

    });

  }

  consultarOS():void{


  }


 

}
