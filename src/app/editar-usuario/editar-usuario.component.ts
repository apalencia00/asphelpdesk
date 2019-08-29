
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { forEach } from '@angular/router/src/utils/collection';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import {FormControl, Validators,ReactiveFormsModule,FormGroup,FormBuilder  } from '@angular/forms';
import { CrearUsuarioService } from '../service/crear-usuario.service';
import { Usuario } from '../model/usuario';



@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

documento: string;
nombre : string;
apellido: string;
estado: string;
perfil:number;
public loading = false;
firstFormGroup: FormGroup;
secondFormGroup : FormGroup;
respuesta : any = [];
step = 0;
respuesta_actualizar : any = [];
  usuarioActualizado: any;

  constructor(private _formBuilder:FormBuilder, private editUser:CrearUsuarioService,private actualizaUser:CrearUsuarioService) { 


  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
    documento:  "",
    nombre : "",
    apellido: "",
    estado: "",
    perfil: 0,

    });
  
    var pathname = window.location.pathname;
    var pathsplit = pathname.split('/');
   var usuario = pathsplit[5];

    this.editUser.cargaDatosUsuario(usuario).subscribe(r => { 
      
      this.respuesta  = r;

      this.documento         =     ''+usuario;
      this.nombre            =     ''+this.respuesta.nombre;
      this.apellido          =     ''+this.respuesta.apellido;
      this.estado            =     ''+this.respuesta.estado;
      this.perfil            =       +this.respuesta.perfil;

console.log(this.documento);
console.log(this.nombre);

  });

}

btActualizar() {

var respuesta_actualizar:any;
let usuarioActualizado = new Usuario();
  var elestado = this.firstFormGroup.get('estado').value;
  var elperfil = this.firstFormGroup.get('perfil').value;
    
  usuarioActualizado.documento      = this.documento;
  usuarioActualizado.nombre      = this.nombre;
  usuarioActualizado.apellido      = this.apellido
  usuarioActualizado.estado = elestado;
  usuarioActualizado.tipo_perfil = elperfil;

  var myformsvalue = this.firstFormGroup.value;

  console.log(myformsvalue.perfil);
  console.log(usuarioActualizado);


this.actualizaUser.actualizaDatosUsuario(this.documento,this.nombre,this.apellido,myformsvalue.estado,myformsvalue.perfil).subscribe(r => { 
      
  this.respuesta_actualizar  = r;


});

}


setStep(index: number) {
  this.step = index;
}

nextStep() {
  this.step++;
}

prevStep() {
  this.step--;
}

}

