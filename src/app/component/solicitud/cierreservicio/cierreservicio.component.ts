

import { Component, OnInit, ɵConsole, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { CierreServicio } from 'src/app/model/cierreservicio';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

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
  solicitante : any;

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


  constructor(private _formBuilder: FormBuilder,private detalleserv : DetalleIncidenciaService,private _cerrarServ :CrearIncidenteService, public dialog: MatDialog) { }

  ngOnInit() {
    
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id); 


    this.firstFormGroup = this._formBuilder.group({

      nservicio : '',
      solicitante: '',
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
      this.solicitante = ''+this.respuesta.solicitante;
  });

  console.log(this.firstFormGroup);
  }

  
cerrarServicio():void{

console.log(this.respuesta);

let cierreserv = new CierreServicio();

var usuario = this.firstFormGroup.get('solicitante').value;
var descrip = this.firstFormGroup.get('descripcionServicio').value;
var estado_serv = this.firstFormGroup.get('estado_servicio').value;
var pendiente_sinserv = this.firstFormGroup.get('pendiente_sinservicio').value;
var invent = this.firstFormGroup.get('descripcionServicio').value;
var imeicel = this.firstFormGroup.get('imei').value;
var sim = this.firstFormGroup.get('simcard').value;
var oper  = this.firstFormGroup.get('operador').value;

console.log(this.firstFormGroup);

cierreserv.nservicio = this.nservicio;
cierreserv.usuario = this.solicitante;
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

const dialogRef = this.dialog.open(DialogServicio, {
  width: '350px',
  height: '150px'
  
});

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');

});








}

}

@Component({
  selector: 'app-cierreservicio',
  templateUrl : 'dialogserviciocreado.html'
 
})

export class DialogServicio{

  constructor(
    public dialogRef: MatDialogRef<DialogServicio>,
    @Inject(MAT_DIALOG_DATA)DialogServicio , private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



  btAceptar():void{

    this.router.navigate(['../peticion']);
  
   
  
  }



}