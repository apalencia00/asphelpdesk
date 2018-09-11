import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import {FormControl, Validators,ReactiveFormsModule,FormGroup,FormBuilder  } from '@angular/forms';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-auditarincidencia',
  templateUrl: './auditarincidencia.component.html',
  styleUrls: ['./auditarincidencia.component.css']
})
export class AuditarincidenciaComponent implements OnInit {

 


  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  step = 1;

	  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor( private location : Location, private _formBuilder: FormBuilder ) { }

  ngOnInit() {

  	 this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
 
  }

  goBack(){
  		this.location.back();
  }

}
