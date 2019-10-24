

import { Component, OnInit, ɵConsole, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { CierreServicio } from 'src/app/model/cierreservicio';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

export interface DialogData {
  larespuesta: any;
  
}

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
  idusuario : any;
  mensaje :any;
  message :any;

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


  constructor(public dialog: MatDialog, private router : Router,private _formBuilder: FormBuilder,private detalleserv : DetalleIncidenciaService,private _cerrarServ :CrearIncidenteService) { }

  ngOnInit() {

     //console.log("aaa"+localStorage.getItem("token"));
     var id = Number(window.localStorage.getItem("token"));
     this.idusuario = window.localStorage.getItem("id_usuario");

     console.log(id);

     console.log(this.idusuario);

     if ( id == 0 ) {

      
      window.localStorage.removeItem("token");
      window.localStorage.clear();
      this.router.navigate(['/']);

     }  

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
      this.nservicio =  ''+this.respuesta.servicio;
      this.solicitante = ''+this.usuario;
  });

  console.log(this.firstFormGroup);
  }

  
cerrarServicio():void{
  var id = Number(window.localStorage.getItem("token"));

console.log(this.respuesta);

let cierreserv = new CierreServicio();

this.usuario= this.firstFormGroup.get('solicitante').value;
var descrip = this.firstFormGroup.get('descripcionServicio').value;
var estado_serv = this.firstFormGroup.get('estado_servicio').value;
var pendiente_sinserv = this.firstFormGroup.get('pendiente_sinservicio').value;
var invent = this.firstFormGroup.get('inventario').value;
var imeicel = this.firstFormGroup.get('imei').value;
var sim = this.firstFormGroup.get('simcard').value;
var oper  = this.firstFormGroup.get('operador').value;

console.log(this.firstFormGroup);

cierreserv.nservicio = this.nservicio;
cierreserv.usuario = id;
cierreserv.inventario = invent;
cierreserv.descripcionServicio = descrip;
cierreserv.estado_servicio = estado_serv;
cierreserv.pendiente_sinservicio = pendiente_sinserv;
cierreserv.imei = imeicel;
cierreserv.simcard = sim;
cierreserv.operador = oper;

this._cerrarServ.cerrrarServicio(cierreserv).subscribe(
  res =>
  { 
    this.mensaje = res;
   var respuestadialog = this.mensaje.resultado ;
    console.log(respuestadialog);

 



const dialogRef = this.dialog.open(DialogServicio, {
  width: '250px',
  height: '140px',
  data: {larespuesta : respuestadialog}
  
});


}
);







}

}

@Component({
  selector: 'app-cierreservicio',
  templateUrl: './dialogserviciocreado.html',
  
})

export class DialogServicio{


  constructor(
    public dialogRef: MatDialogRef<DialogServicio>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  
}









