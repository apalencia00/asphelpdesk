
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { NumberValueAccessor } from '@angular/forms/src/directives';




@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})


export class CrearusuarioComponent implements OnInit {

  firstFormGroup    : FormGroup;
  tipo_identificacion : number;
  identificacion    : string;
  nombre  : string;
  apellido : string;
  telefono : string;
  rol      : number;
  correo   : string;
  respuesta : any;
  rol_usuario: any;
  tipo_id : any;

  public loading = false;

  constructor(private _formBuilder: FormBuilder,private user : CrearUsuarioService, public dialog: MatDialog) {
    
   }



  ngOnInit() {

//console.log("aaa"+localStorage.getItem("token"));
var id = Number(localStorage.getItem("token"));
//console.log(id); 

    this.firstFormGroup = this._formBuilder.group({

      tipo_identificacion : [0,Validators.required],
      identificacion      : ['', Validators.minLength(6)],
      nombre              : ['', Validators.minLength(4)],
      apellido            : ['', Validators.minLength(4)],
      telefono            : ['', Validators.minLength(6)],
      rol                 : [0, Validators.required],
      correo              : ['', Validators.required]

    });

  }

  guardar() : void{

    const formModel   = this.firstFormGroup.value;
    console.log(formModel);
     this.tipo_id = Number(formModel.tipo_identificacion);
   this.rol_usuario = Number(formModel.rol);
   console.log(this.tipo_id);
   console.log(this.rol_usuario);

    if(formModel.identificacion == "" || formModel.nombre == "" || formModel.apellido == "" ||  this.tipo_id == 0 || this.rol_usuario == 0){

      Swal.fire(
  "Evento De Aplicacion",
  "Favor diligenciar todos los campos correspondientes",
  'error'

)


    } else {
    this.user.crearUsuario(formModel.tipo_identificacion,formModel.identificacion,'CSA'+formModel.identificacion,formModel.nombre,formModel.apellido,formModel.rol,"A").subscribe( r => {
   console.log(formModel.tipo_identificacion,formModel.identificacion,'CSA'+formModel.identificacion,formModel.nombre,formModel.apellido,formModel.rol,"A");
   
      this.respuesta = r;
    this.loading = true;
    setTimeout(() => {
     var usuarioinfo = this.respuesta.resultado ;

      if ( this.respuesta.codigo == 1 || this.respuesta.codigo == 2 ) {
        Swal.fire({
          title: 'Evento de Aplicacion',
          text: usuarioinfo,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            
            window.location.reload();

          }
        })
          
         
      //this.loading = false;

    }else{

      Swal.fire(
        "Evento De Aplicacion",
        "Error al Crear el Usuario",
        'error'
      
      )

    }
   
   this.loading = false;
   

    }, 3000);


  });

}
    
  }
  
  





}
export interface DialogData{

  elmensaje: any[];
  mensaje :any;
}


@Component({
  selector: 'app-crearusuario',
  templateUrl : 'dialogusuariocreado.html'
 
})


export class DialogUserCreado{

  

  constructor(
    public dialogRef: MatDialogRef<DialogUserCreado>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }
  onNoClick(): void {
    this.dialogRef.close();
  }


  
    

}
