import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Incidente } from 'src/app/model/incidente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missolicitudes',
  templateUrl: './missolicitudes.component.html',
  styleUrls: ['./missolicitudes.component.css']
})
export class MissolicitudesComponent implements OnInit {
  lista_incidente : Incidente[];
  
  // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;
  
  displayedColumns: string[] = ['servicio', 'asunto', 'solicitante', 'direccion','fecha','estado','detalle'];
  dataSource: any;
  
  constructor(private inciden : CrearIncidenteService, private router : Router) { }

  ngOnInit() {


    
//console.log("aaa"+localStorage.getItem("token"));
var id = Number(window.localStorage.getItem("token"));
console.log(id);

if ( id == 0 ) {

 
 window.localStorage.removeItem("token");
 window.localStorage.clear();
 this.router.navigate(['/']);

}  

this.inciden.listarServicio().subscribe(r => { 
 this.lista_incidente = r;
 
 this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
 this.dataSource.paginator = this.paginator;

} );   


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  filtroTipoServicio(oper: number, dato: string) {

    this.inciden.listarServicioByCriterio(oper, dato).subscribe(r => {
      this.lista_incidente = r;

      this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;


    });

  }

  filtroEstado(oper: number, dato: string) {
    console.log(oper)
    this.inciden.listarServicioByCriterio(oper, dato).subscribe(r => {
      this.lista_incidente = r;

      this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;

    });

  }

}
