import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrartecnicoService } from 'src/app/service/registrartecnico.service';

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

  constructor( private _formBuilder : FormBuilder, private registroTec : RegistrartecnicoService) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({

      tipo_identificacion   : ['',  Validators.required],
      documento    : ['', Validators.minLength(8) ],
      nombre : ['', Validators.required ],
      apellido : ['', Validators.required ],
      extension : ['', Validators.required ],
      direccion : ['', Validators.required ],
      rol : ['', Validators.required ]

    });

  }


  onSubmit(){

    console.log("Guardando datos");

    
    const formModel = this.firstFormGroup.value;


    this.registroTec.crearTecnico(formModel.tipo_identificacion,formModel.documento,formModel.nombre,formModel.apellido,formModel.extension,formModel, formModel.rol)
    .subscribe( r => {

    
      console.log(this.registroTec);
    });


    console.log(formModel);
  }

}
