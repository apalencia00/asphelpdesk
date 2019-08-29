
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrearPuntoventaService } from 'src/app/service/crear-puntoventa.service';

@Component({
  selector: 'app-puntoventa',
  templateUrl: './puntoventa.component.html',
  styleUrls: ['./puntoventa.component.css']
})
export class PuntoventaComponent implements OnInit {

  firstFormGroup : FormGroup;

  idpunto   : Number ;
  nombre    : string = '';
  direccion : string = '';
  secondFormGroup   : FormGroup;

 
  constructor( private _formBuilder : FormBuilder, private crearpunto : CrearPuntoventaService ) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({

      idpunto   : [0,  Validators.required, Validators.minLength(4)     ],
      nombre    : ['', Validators.minLength(6) ],
      direccion : ['', Validators.minLength(6) ]


    });

  }

  onSubmit(): void {

    console.log("Guardando datos");

    const formModel = this.firstFormGroup.value;
    const formDetalle = this.secondFormGroup.value;



    console.log(formModel);



    this.crearpunto.crearPuntoVenta(formModel.idpunto,formModel.nombre,formModel.direccion).subscribe( r => {



    });

  }

}