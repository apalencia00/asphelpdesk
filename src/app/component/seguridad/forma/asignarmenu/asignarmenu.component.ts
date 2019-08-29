import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import  {MenuServicio} from 'src/app/model/menu_servicio';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import { MatPaginator, MatDialog } from '@angular/material';
import { Sub_Menu_Servicio } from 'src/app/model/sub_menu_servicio';


@Component({
  selector: 'app-asignarmenu',
  templateUrl: './asignarmenu.component.html',
  styleUrls: ['./asignarmenu.component.css']
})
export class AsignarmenuComponent implements OnInit {
  
  firstFormGroup: FormGroup;
secondFormGroup : FormGroup;
  public loading = false;
  step = 0;
  public id: number;
		descripcion: string;
		acceso: string;
		usuario: number;
		estilo: string;
    icono: string;
    lista_menu_servicios:MenuServicio[] ;
    lista_submenuservicios:Sub_Menu_Servicio[];
    lista_opcion : any;
    dataSource: any;

    displayedColumns: string[] = ['id', 'descripcion', 'icono'];
   	 // Controlador para los componentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;


    resultado : any;
  constructor(public dialog: MatDialog,private opcion : PerfilOpcionService) { }

  ngOnInit() {


         // Con esto carga el paginator a los datos del datasource(base de datos)
         this.opcion.getAllMenus().subscribe(r => { 
          this.lista_menu_servicios = r;
          
          this.dataSource =  new MatTableDataSource<any>(this.lista_menu_servicios);
          this.dataSource.paginator = this.paginator;
        });

        // Con esto carga el paginator a los datos del datasource(base de datos)
        this.opcion.getAllSubMenus().subscribe(r => { 
          this.lista_submenuservicios = r;
          
          this.dataSource =  new MatTableDataSource<any>(this.lista_submenuservicios);
          this.dataSource.paginator = this.paginator;
        });


  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setStep(index: number) {
    this.step = index;
  }
  
  nextStep() {
    this.step++;
  }
  
  prevStep() {
    this.step--;
  }
}
