import { Component, OnInit, ViewChild }      from '@angular/core';
import { MatPaginator,MatTableDataSource }   from '@angular/material';
import { MatMenuModule }                     from '@angular/material/menu';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  descripcion : string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', descripcion:''},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', descripcion:''},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', descripcion:''},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', descripcion:''},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', descripcion:''},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', descripcion:''},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', descripcion:''},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', descripcion:''},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', descripcion:''},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', descripcion:''},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', descripcion:''},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', descripcion:''},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', descripcion:''},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', descripcion:''},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', descripcion:''},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', descripcion:''},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', descripcion:''},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', descripcion:''},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', descripcion:''},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', descripcion:''}

];


@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {

 // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;

	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','descripcion'];
  	dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {

  	// Con esto carga el paginator a los datos del datasource(base de datos)
  	this.dataSource.paginator = this.paginator;
  }

}
