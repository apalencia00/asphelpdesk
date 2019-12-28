
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';




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

    this.user.crearUsuario(formModel.tipo_identificacion,formModel.identificacion,'CSA'+formModel.identificacion,formModel.nombre,formModel.apellido,formModel.rol).subscribe( r => {
    this.respuesta = r;
    this.loading = true;
    setTimeout(() => {
     var usuarioinfo = this.respuesta.resultado ;

      if ( this.respuesta.codigo == 1 || this.respuesta.codigo == 2 ) {
        Swal.fire(
usuarioinfo )
          
  
    
          
         
      //this.loading = false;

    }else{

      

    }
   
   this.loading = false;
   

    }, 3000);


  })

  
    
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
