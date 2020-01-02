
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import Swal from 'sweetalert2';

export interface DialogData{

elmensaje : any;
elmensaje2 : any;
}


@Component({
  selector: 'app-crearforma',
  templateUrl: './crearforma.component.html',
  styleUrls: ['./crearforma.component.css']
})

export class CrearformaComponent implements OnInit {
  
  nombre: string;
  icono: string;
  firstFormGroup: FormGroup;
respuesta : any;
name :any;
 

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private router : Router,public main: PerfilOpcionService) { }

  ngOnInit() {
    
//console.log("aaa"+localStorage.getItem("token"));
var id = Number(localStorage.getItem("token"));
//console.log(id); 
this.firstFormGroup = this._formBuilder.group({
nombre :['',Validators.required],
icono  :['',Validators.required],

                                          
  });

}


guardarMenu():void {
  
  
  const formModel   = this.firstFormGroup.value;


  if(formModel.nombre == "" || formModel.icono == "") {
    Swal.fire(
      "Evento de Aplicacion",
      "No se diligencian aun los campos",
      'error'
    )
    }else{
this.main.crearMenu(formModel.nombre,formModel.icono).subscribe( r => {

  this.respuesta = r;
Swal.fire(
  "Menu Creado correctamente",
  this.respuesta,
  'success'
)




});


}





}



}