import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { MatMenuModule }                     from '@angular/material/menu';
import { Incidente } from 'src/app/model/incidente';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { PusherService } from 'src/app/service/pusher.service';
import { ActivatedRoute, Router } from "@angular/router";



 

@Component({
  selector: 'app-historialsolicitud',
  templateUrl: './historialsolicitud.component.html', 
  styleUrls: ['./historialsolicitud.component.css']
})

export class HistorialsolicitudComponent implements OnInit { 
// Controlador para los coponentes hijos, este caso el paginador.

lista_incidente : Incidente[];
lista_historial_puntos : any;
punto_venta : any;
snapshotParam = "initial value";

	@ViewChild(MatPaginator) paginator : MatPaginator;

  displayedColumns: string[] = ['servicio', 'fecha' ,'pventa', 'asunto', 'direccion','sucursal'];
  dataSource: any;


  constructor(public router : Router,private route: Router, private inciden : CrearIncidenteService,private pusherService: PusherService) { }

  ngOnInit() {

     //console.log("aaa"+localStorage.getItem("token"));
     var id = Number(window.localStorage.getItem("token"));
     console.log(id);

     if ( id == 0 ) {

      
      window.localStorage.removeItem("token");
      window.localStorage.clear();
      this.router.navigate(['/']);

     }  

    //consulto OS para obtener ID de punto de venta.

    //console.log(this.route.url);
    var myhurl = this.route.url;
    var arrayDeCadenas = myhurl.split("/");

    this.inciden.consultarpuntoventabyos(arrayDeCadenas[4]).subscribe( r=>{
      this.punto_venta = r;

      this.inciden.listarHistorialPuntosVenta(this.punto_venta).subscribe(r => { 
        this.lista_historial_puntos = r;  
        this.dataSource =  new MatTableDataSource<any>(this.lista_historial_puntos);
        this.dataSource.paginator = this.paginator;
  
      });

    });
 
    console.log(this.punto_venta);
    

  }

  hiddenChat(){



  }

  enviarMensaje() {

    console.log("aqui se envia el mensaje");

  }

}
