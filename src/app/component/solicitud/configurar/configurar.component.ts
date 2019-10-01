import { Component, OnInit, ViewChild }      from '@angular/core';
import { MatPaginator,MatTableDataSource }   from '@angular/material';
import { MatMenuModule }                     from '@angular/material/menu';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Incidente } from 'src/app/model/incidente';
import { PusherService } from 'src/app/service/pusher.service';




@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {

  lista_incidente : Incidente[];
  respuesta : any;

 // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;

  displayedColumns: string[] = ['servicio', 'asunto', 'direccion','fecha','descripcion'];
  dataSource: any;

  constructor(private inciden : CrearIncidenteService,private pusherService: PusherService) { }

  ngOnInit() {
//console.log("aaa"+localStorage.getItem("token"));
var id = Number(localStorage.getItem("token"));
//console.log(id); 
    this.pusherService.list_asignado("T").subscribe(
      res => {
        this.lista_incidente = res; 
        this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
        this.dataSource.paginator = this.paginator;

      });

 /*   this.inciden.listarServicio().subscribe(r => { 
      this.lista_incidente = r;
      
      this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;
    
    } ); */   
    
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
    
    } ); 


   

    


  }

  filtroTecnico(oper : number,dato : string){

    this.inciden.listarServicioByCriterio(oper,dato).subscribe(r => { 
      this.lista_incidente = r;
      
      this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;
    
    } ); 

  }

  filtroEstado(oper:number,dato: string){

    this.inciden.listarServicioByCriterio(oper,dato).subscribe(r => { 
      this.lista_incidente = r;
      
      this.dataSource =  new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;
    
    } ); 

  }


  
  }


