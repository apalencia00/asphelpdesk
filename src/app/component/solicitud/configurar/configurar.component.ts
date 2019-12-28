import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Incidente } from 'src/app/model/incidente';
import { PusherService } from 'src/app/service/pusher.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as Pusher from 'node_modules/pusher-js/dist/web/pusher.js';
import { environment } from 'src/environments/environment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';




@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {



  respuesta: any;

  lista_incidente: Incidente[];
  respuesta_acceso: any;

  pusher: Pusher;
  channel: any;

  // Controlador para los coponentes hijos, este caso el paginador.
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['servicio', 'asunto', 'direccion', 'fecha', 'solicitante', 'estado', 'descripcion'];
  dataSource: any;

  constructor(private router: Router, private inciden: CrearIncidenteService, private pusherService: PusherService) {

    this.pusher = new Pusher(
      environment.pusher.key, {
        cluster: environment.pusher.cluster,
        encrypted: true
      });


    this.channel = this.pusher.subscribe('list-service');


  }

  ngOnInit() {

    var id = Number(window.localStorage.getItem("token"));
    console.log(id);

    if (id == 0) {

      window.localStorage.removeItem("token");
      window.localStorage.clear();
      this.router.navigate(['/']);

    }

     this.pusherService.list_asignado("T").subscribe(
      res => {
        this.lista_incidente = res;
        this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
        this.dataSource.paginator = this.paginator;

      });  


    this.channel.bind('my-assignation', data =>{
      console.log(data);
      var myjson = JSON.parse(data);
      console.log(myjson);
      this.lista_incidente = myjson;
      this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;
       

    });


  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtrarTodos(event) {

    event.preventDefault();
    this.pusherService.list_asignado("T").subscribe(
      res => {
        this.lista_incidente = res;
        this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
        this.dataSource.paginator = this.paginator;

      });

  }



  exportarExcel(): void {

    this.inciden.exportExcel().subscribe(r => {
      this.respuesta = r;
      console.log(this.respuesta);

      this.exportAsExcelFile(this.respuesta, 'export-excel');

    });

    event.preventDefault();
    console.log("Acceso aqui");

  }




  filtroTipoServicio(oper: number, dato: string) {

    this.inciden.listarServicioByCriterio(oper, dato).subscribe(r => {
      this.lista_incidente = r;

      this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;

    });

  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  filtroTecnico(oper: number, dato: string) {

    this.inciden.listarServicioByCriterio(oper, dato).subscribe(r => {
      this.lista_incidente = r;

      this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;

    });

  }

  filtroEstado(oper: number, dato: string) {

    this.inciden.listarServicioByCriterio(oper, dato).subscribe(r => {
      this.lista_incidente = r;

      this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;

    });

  }

  //





}


