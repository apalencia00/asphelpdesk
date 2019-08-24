
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { DialogLogin } from 'src/app/component/bienvenido/bienvenido.component';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialog } from 'src/app/component/solicitud/incidente/incidente.component';

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

  constructor(private _formBuilder: FormBuilder,private user : CrearUsuarioService ) { }



  ngOnInit() {

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

  }

  
 



}

