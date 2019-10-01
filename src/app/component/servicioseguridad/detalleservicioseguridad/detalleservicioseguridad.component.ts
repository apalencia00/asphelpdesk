import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalleservicioseguridad',
  templateUrl: './detalleservicioseguridad.component.html',
  styleUrls: ['./detalleservicioseguridad.component.css']
})
export class DetalleservicioseguridadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  
  //console.log("aaa"+localStorage.getItem("token"));
  var id = Number(localStorage.getItem("token"));
  //console.log(id); 
  }

}
