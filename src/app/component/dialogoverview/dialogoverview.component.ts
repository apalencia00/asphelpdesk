import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  elservicio: any;

}

@Component({
  selector: 'app-dialogoverview',
  templateUrl: './dialogoverview.component.html',
  styleUrls: ['./dialogoverview.component.css']
})
export class DialogoverviewComponent implements OnInit {

  elservicio : any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}

  




