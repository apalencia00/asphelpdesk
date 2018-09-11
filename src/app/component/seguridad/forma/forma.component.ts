import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  codigo: string;
  position: number;
  nombre: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, codigo: 'CP1238998', nombre: 'Juan Perez', symbol: 'A'},
  {position: 2, codigo: 'CV90893', nombre: 'Liu Kang', symbol: 'A'},
  {position: 3, codigo: 'CP1231999', nombre: 'Juan Chi', symbol: 'A'},
  {position: 4, codigo: 'CP12778', nombre: 'Motaro', symbol: 'A'},
  {position: 5, codigo: 'CV65188', nombre: 'Sonia', symbol: 'A'},
  {position: 6, codigo: 'Carbon', nombre: 'Jax', symbol: 'A'},
  {position: 7, codigo: 'Nitrogen', nombre: 'Sub Zero', symbol: 'A'},
  {position: 8, codigo: 'Oxygen', nombre: 'Scorpion', symbol: 'A'},
  {position: 9, codigo: 'Fluorine', nombre: 'Jonny Cage', symbol: 'A'},
  {position: 10, codigo: 'Neon', nombre: 'Mortal Kombat', symbol: 'A'},
];


@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.css']
})


export class FormaComponent implements OnInit {

	 // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;

	displayedColumns: string[] = ['position', 'codigo', 'nombre', 'symbol'];
  	dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {

  	  	  	// Con esto carga el paginator a los datos del datasource(base de datos)
  	this.dataSource.paginator = this.paginator;
  	

  }

}
