import { Component, OnInit, ViewChild }    from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { CrearusuarioComponent }           from './crearusuario/crearusuario.component';
import {MatDialog, MatDialogRef }          from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  nombre: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'CP1238998', nombre: 'Juan Perez', symbol: 'A'},
  {position: 2, name: 'CV90893', nombre: 'Liu Kang', symbol: 'A'},
  {position: 3, name: 'CP1231999', nombre: 'Juan Chi', symbol: 'A'},
  {position: 4, name: 'CP12778', nombre: 'Motaro', symbol: 'A'},
  {position: 5, name: 'CV65188', nombre: 'Sonia', symbol: 'A'},
  {position: 6, name: 'Carbon', nombre: 'Jax', symbol: 'A'},
  {position: 7, name: 'Nitrogen', nombre: 'Sub Zero', symbol: 'A'},
  {position: 8, name: 'Oxygen', nombre: 'Scorpion', symbol: 'A'},
  {position: 9, name: 'Fluorine', nombre: 'Jonny Cage', symbol: 'A'},
  {position: 10, name: 'Neon', nombre: 'Mortal Kombat', symbol: 'A'},
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

 // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;
	
	resultado;
	displayedColumns: string[] = ['select','position', 'name', 'nombre', 'symbol'];
  	dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
      }


     masterToggle() {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        
      }

    constructor(public dialog: MatDialog) { }

    crearUsuario(): void {
    const dialogRef = this.dialog.open(CrearusuarioComponent, {
      width: '250px',
      height: '400px'
    });

  }

  	ngOnInit () {
  	  	// Con esto carga el paginator a los datos del datasource(base de datos)
  	this.dataSource.paginator = this.paginator;
 
  }

    applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
  
