import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

	version = VERSION;

  constructor() { }

  ngOnInit() {
  }

}
