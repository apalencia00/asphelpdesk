import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearforma',
  templateUrl: './crearforma.component.html',
  styleUrls: ['./crearforma.component.css']
})
export class CrearformaComponent implements OnInit {
  
  nombre : string;
  icono : string;
  firstFormGroup    : FormGroup;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private router : Router,  private _location: Location) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({

nombre :['',Validators.required,Validators.minLength(11)],
icono  :['',Validators.required,Validators.minLength(12)],

                                               








  });

}


guardarMenu(){
  
}

}
