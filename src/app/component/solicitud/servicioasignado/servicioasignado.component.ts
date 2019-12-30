import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Incidente } from 'src/app/model/incidente';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicioasignado',
  templateUrl: './servicioasignado.component.html',
  styleUrls: ['./servicioasignado.component.css']
})
export class ServicioasignadoComponent implements OnInit {

  lista_incidente : Incidente[];
  tecnicos : any = [];
  tiposervicio : any;
  
  // Controlador para los coponentes hijos, este caso el paginador.
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  displayedColumns: string[] = ['servicio', 'asunto',  'direccion','fecha','estado','tecnico','detalle'];
  dataSource: any;
  
  

  constructor(private router : Router,private inciden : CrearIncidenteService,private detalleserv : DetalleIncidenciaService) { }

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

        this.detalleserv.cargaDatosPersonalTecnico("").subscribe(r => {
      this.tecnicos = r;

        });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtroTipoServicio(oper: number,dato : string){

    this.inciden.listarServicioByCriterio(oper,dato).subscribe(r => { 
      this.lista_incidente = r;
      
      this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;
    
        }); 


  }

  filtroTecnico(oper: number,dato : string){

    this.inciden.listarServicioByCriterio(oper,dato).subscribe(r => { 
      this.lista_incidente = r;
      
      this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;
    
    } ); 

  }

}
