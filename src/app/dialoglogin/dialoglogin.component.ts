import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  servicio: string;

}

@Component({
  selector: 'app-dialoglogin',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.css']
})
export class DialogloginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 
 //console.log("aaa"+localStorage.getItem("token"));
 var id = Number(localStorage.getItem("token"));
 //console.log(id); 
 
  }

}
