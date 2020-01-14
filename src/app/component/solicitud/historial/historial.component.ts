import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatTableDataSource, MatDatepicker } from '@angular/material';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Incidente } from 'src/app/model/incidente';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  
  
  lista_incidente : Incidente[];

  reactform : FormGroup;
  
  // Controlador para los coponentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;
  
  displayedColumns: string[] = ['servicio', 'asunto', 'solicitante', 'direccion','fecha','estado','detalle'];
  dataSource: any;
  respuesta : any;
  minDate = new Date(2019, 6, 6);
  fechai : any;
  fechaf : any;

  constructor(private inciden : CrearIncidenteService, private router : Router, private gp : FormBuilder) { }
  
  ngOnInit() {

    this.reactform = this.gp.group({

      fecha1   : [Validators.minLength(6)],
      fecha2   : [ Validators.minLength(6) ]

    });

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
  
  exportarExcel(): void {

    this.inciden.exportExcel().subscribe(r => {
      this.respuesta = r;
      console.log(this.respuesta);

      this.exportAsExcelFile(this.respuesta, 'export-excel');

    });

    event.preventDefault();
    console.log("Acceso aqui");

  }

  inputEvent2(event){
    // Return date object 
    console.log(event.value);
  }
  inputEvent(event){
    // Return date object 
    console.log(event.value);
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
    console.log(oper)
    this.inciden.listarServicioByCriterio(oper, dato).subscribe(r => {
      this.lista_incidente = r;

      this.dataSource = new MatTableDataSource<any>(this.lista_incidente);
      this.dataSource.paginator = this.paginator;

    });

  }


  filtroFecha(){

    const form = this.reactform.value;
    console.log(form);
    this.fechai = form.fecha1.getTime();
    this.fechaf = form.fecha2.getTime();
    console.log(this.fechai)



   this.inciden.filtroSolicitudesFecha(this.fechai,this.fechaf).subscribe(r=>{
      this.respuesta = r;
      console.log(this.respuesta)
    });



  }
  
}
