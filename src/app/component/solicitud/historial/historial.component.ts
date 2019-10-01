import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Incidente } from 'src/app/model/incidente';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  
  
  lista_incidente : Incidente[];
  
  // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;
  
  displayedColumns: string[] = ['servicio', 'asunto', 'solicitante', 'direccion','fecha','estado','detalle'];
  dataSource: any;
  
  
  
  constructor(private inciden : CrearIncidenteService) { }
  
  ngOnInit() {


    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id); 
    
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
  
  
  
}
