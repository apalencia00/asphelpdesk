import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrartecnicoService } from 'src/app/service/registrartecnico.service';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrotecnico',
  templateUrl: './registrotecnico.component.html',
  styleUrls: ['./registrotecnico.component.css']
})
export class RegistrotecnicoComponent implements OnInit {

  firstFormGroup : FormGroup;

  tipo_identificacion : string='';
  documento   : string ='';
  nombre    : string = '';
  apellido : string = '';
  extension : string = '';
  direccion : string = '';
  rol : string = '';
  public loading = false;
respuesta : any;

  constructor( private _formBuilder : FormBuilder, private crearTec : CrearUsuarioService, private router: Router) { }

  ngOnInit() {


    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id); 
    
    this.firstFormGroup = this._formBuilder.group({

      tipo_identificacion   : [0,  Validators.required],
      documento    : ['', Validators.minLength(8) ],
      nombre : ['', Validators.required ],
      apellido : ['', Validators.required ],
      celular: ['', Validators.required],
      personal : ['', Validators.required],
      extension : ['', Validators.required ],
      rol : [0, Validators.required ]
      
    });

  }


  onSubmit():void{

    console.log("Guardando datos");

    
    const formModel = this.firstFormGroup.value;
    this.loading = true;
                setTimeout(() => {
    
    
 
    if(formModel.tipo_identificacion == 0 || formModel.documento == "" || formModel.nombre == ""|| formModel.apellido == "" || formModel.rol == 0 ){

  Swal.fire(
    'Evento de Aplicacion'
    ,'favor completar los campos',
    'error'
  )
  this.loading = false;

}else{




this.loading = true;

  this.crearTec.crearTecnico(formModel.tipo_identificacion,formModel.documento,formModel.nombre,formModel.apellido,formModel.celular, formModel.personal,formModel.extension, formModel.rol).subscribe( 
  r => {

  this.respuesta = r;
  if(this.respuesta.codigo == 1){

  Swal.fire({
    title: 'Evento de Aplicacion',
    text: this.respuesta.respuesta,
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.value) {
      
      this.router.navigate(['../peticion/dashboard']);

    }
  })
    

  }else{
    Swal.fire(
      'Evento de Aplicacion'
      ,'No se ha registrado el tecnico, comunicarse con administracion',
      'error'
    )

  }
  
 

      console.log(this.respuesta);
    });
  }

  },3000);
 

    console.log(formModel);
  }



  loadPage() : void {
    this.loading = true;

  }


}
