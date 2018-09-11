import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

	version = VERSION;

  constructor(public dialog: MatDialog) { }

  	 openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent,{
       height: '250px',
  		width: '400px'
    });

}

  ngOnInit() {
  }



}
