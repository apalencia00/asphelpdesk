import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';

@Component({
  selector: 'app-detallemisolicitud',
  templateUrl: './detallemisolicitud.component.html',
  styleUrls: ['./detallemisolicitud.component.css'] 
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




  constructor(private route: Router,private _formBuilder: FormBuilder,private detalleserv : DetalleIncidenciaService) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({

      numservicio      : ['', Validators.minLength(6)],
      fechaapertura    : ['', Validators.minLength(6)],
      sucursal         : ['', Validators.minLength(6)],
      direccion        : ['', Validators.minLength(4)],
      obs              : ['', Validators.minLength(11)],
      tecnico          : '',
      identificacion   : ['', Validators.minLength(11)],
      asunto           : ''

        });


    var myhurl = this.route.url;
    var arrayDeCadenas = myhurl.split("/");
    this.soypipe = arrayDeCadenas[4];

    this.detalleserv.consultarvisita(this.soypipe).subscribe(r => {
        
      this.datos = r;

      if ( this.datos != null ){

        this.numservicio      = this.datos; 
        this.fechaapertura    = this.datos;
        this.sucursal         = this.datos;
        this.direccion        = this.datos; 
        this.obs              
        this.tecnico          
        this.identificacion   
        this.asunto        
      }
      

    });

  }

  consultarOS():void{


  }


 

}
