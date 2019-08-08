import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CrearformaComponent } from './crearforma/crearforma.component';
import {SelectionModel} from '@angular/cdk/collections';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';






@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.css']
})


export class FormaComponent implements OnInit {

  resultado : any;
  lista_opcion : any;
  displayedColumns: string[] = ['id', 'descripcion', 'icono'];
  dataSource: any;

	 // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;


  


  constructor(public dialog: MatDialog, private opcion : PerfilOpcionService) { }

  crearForma(): void {
    const dialogRef = this.dialog.open(CrearformaComponent, {
      width: '250px',
      height: '400px'
    });

}

  ngOnInit() {

            // Con esto carga el paginator a los datos del datasource(base de datos)
            this.opcion.getAllMenus().subscribe(r => { 
            this.lista_opcion = r;
            
            this.dataSource =  new MatTableDataSource<any>(this.lista_opcion);
            this.dataSource.paginator = this.paginator;
          });

 
  }

      applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
