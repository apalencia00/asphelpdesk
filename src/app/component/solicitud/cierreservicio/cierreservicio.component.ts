import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { CierreServicio } from 'src/app/model/cierreservicio';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';

@Component({
  selector: 'app-cierreservicio',
  templateUrl: './cierreservicio.component.html',
  styleUrls: ['./cierreservicio.component.css']
})

export class CierreservicioComponent implements OnInit {

  
  respuesta: any;
  nservicio : string = '';
  observacion : string;
  descripcionServicio: string;
  estado_servicio: string;
  imei: string;
  firstFormGroup: FormGroup;
  secondFormGroup : FormGroup;
  simcard: any;
  pendiente_sinservicio : any;
  operador : any;
  step = 0;
  inventario: any;
  usuario : any;


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;

    if ( this.step == 1 ) {

      console.log("este es el final");

    }

  }

  prevStep() {
    this.step--;
  }


  constructor(private _formBuilder: FormBuilder,private detalleserv : DetalleIncidenciaService,private _cerrarServ :CrearIncidenteService) { }

  ngOnInit() {
    
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id); 


    this.firstFormGroup = this._formBuilder.group({

      nservicio : '',
      usuario: ' ',
      observacion : ['',Validators.required],
      descripcionServicio: ['',Validators.required],
      pendiente_sinservicio : ['',Validators.required],
      inventario : ['',Validators.required],
      estado_servicio: ['',Validators.required],
      imei:['',Validators.required],
      simcard: ['',Validators.required],
      operador : ['',Validators.required],
  
    });

    var pathname = window.location.pathname;
    var pathsplit = pathname.split('/');
    var servicio = pathsplit[4];
    console.log(servicio);

    this.detalleserv.cargaDatosSolicitud(servicio).subscribe(r => { 
     
      this.respuesta  = r;
      this.nservicio =           ''+this.respuesta.servicio;

  });

  
  }

  
cerrarServicio():void{

console.log(this.respuesta);

let cierreserv = new CierreServicio();

var usuario = this.firstFormGroup.get('usuario').value;
var descrip = this.firstFormGroup.get('descripcionServicio').value;
var estado_serv = this.firstFormGroup.get('estado_servicio').value;
var pendiente_sinserv = this.firstFormGroup.get('pendiente_sinservicio').value;
var invent = this.firstFormGroup.get('descripcionServicio').value;
var imeicel = this.firstFormGroup.get('imei').value;
var sim = this.firstFormGroup.get('simcard').value;
var oper  = this.firstFormGroup.get('operador').value;



cierreserv.nservicio = this.nservicio;
cierreserv.usuario = this.usuario;
cierreserv.inventario = invent;
cierreserv.descripcionServicio = descrip;
cierreserv.estado_servicio = estado_serv;
cierreserv.pendiente_sinservicio = pendiente_sinserv;
cierreserv.imei = imeicel;
cierreserv.simcard = sim;

cierreserv.operador = oper;

this._cerrarServ.cerrrarServicio(cierreserv as CierreServicio).subscribe(
  res =>
  {
console.log(cierreserv);

  }
);








}

}
