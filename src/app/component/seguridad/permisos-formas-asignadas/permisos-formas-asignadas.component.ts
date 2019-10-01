import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-permisos-formas-asignadas',
  templateUrl: './permisos-formas-asignadas.component.html',
  styleUrls: ['./permisos-formas-asignadas.component.css']
})
export class PermisosFormasAsignadasComponent implements OnInit { //cargarsubopcionestodas


  resultado : any;
  lista_opcion : any;
  displayedColumns: string[] = ['id', 'descripcion', 'icono','menu','acceso'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private opcion : PerfilOpcionService) { }

  ngOnInit() {

//console.log("aaa"+localStorage.getItem("token"));
var id = Number(localStorage.getItem("token"));
//console.log(id); 
    
// Con esto carga el paginator a los datos del datasource(base de datos)
          this.opcion.getAllSubMenus().subscribe(r => { 
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
