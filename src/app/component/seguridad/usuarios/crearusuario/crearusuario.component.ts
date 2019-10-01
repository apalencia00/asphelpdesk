
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { DialogLogin, DialogData } from 'src/app/component/bienvenido/bienvenido.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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

  constructor(private _formBuilder: FormBuilder,private user : CrearUsuarioService, public dialog: MatDialog, private router : Router,  private _location: Location ) {
    
   }



  ngOnInit() {

//console.log("aaa"+localStorage.getItem("token"));
var id = Number(localStorage.getItem("token"));
//console.log(id); 

    this.firstFormGroup = this._formBuilder.group({

      tipo_identificacion : [0,Validators.required],
      identificacion      : ['', Validators.required,Validators.minLength(11)],
      nombre              : ['', Validators.required,Validators.minLength(11)],
      apellido            : ['', Validators.required,Validators.minLength(11)],
      telefono            : ['', Validators.minLength(6)],
      rol                 : [0, Validators.required],
      correo              : ['', Validators.required]

    });

  }

  guardar() : void{

    const formModel   = this.firstFormGroup.value;

    this.user.crearUsuario(formModel.tipo_identificacion,formModel.identificacion,'CSA'+formModel.identificacion,formModel.nombre,formModel.apellido,formModel.rol).subscribe( r => {
    


    })

    const dialogRef = this.dialog.open(DialogUserCreado, {
      width: '350px',
      height: '150px'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });


    

    
  }
  
  





}



@Component({
  selector: 'app-crearusuario',
  templateUrl : 'dialogusuariocreado.html'
 
})


export class DialogUserCreado{

  

  constructor(
    public dialogRef: MatDialogRef<DialogUserCreado>,
    @Inject(MAT_DIALOG_DATA)DialogUserCreado , private _location: Location, private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  btAceptar():void{

    this.router.navigate(['./seguridad/usuario/1']);
  
   
  
  }
    

}
