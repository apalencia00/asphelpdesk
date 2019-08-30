import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import  {MenuServicio} from 'src/app/model/menu_servicio';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import { MatPaginator, MatDialog } from '@angular/material';
import { Sub_Menu_Servicio } from 'src/app/model/sub_menu_servicio';
import { UsuarioAsignado } from 'src/app/model/usuarioasignado';


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
    dataSource2: any;
    displayedColumns: string[] = ['id', 'descripcion', 'icono','select'];
    displayedColumns2: string[] = ['id', 'descripcion', 'acceso','icono','select'];
    selection = new SelectionModel<UsuarioAsignado>(true, []);
    
   	 // Controlador para los componentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;


    resultado : any;
  constructor(public dialog: MatDialog,private opcion : PerfilOpcionService,private opcion2: PerfilOpcionService) { }

  ngOnInit() {


         // Con esto carga el paginator a los datos del datasource(base de datos)
         this.opcion.getAllMenus().subscribe(r => { 
          this.lista_menu_servicios = r;
          
          this.dataSource =  new MatTableDataSource<any>(this.lista_menu_servicios);
          this.dataSource.paginator = this.paginator;
        });

        // Con esto carga el paginator a los datos del datasource(base de datos)
        this.opcion2.getAllSubMenus().subscribe(r => { 
          this.lista_submenuservicios = r;
          
          this.dataSource2 =  new MatTableDataSource<any>(this.lista_submenuservicios);
          this.dataSource2.paginator = this.paginator;
        });


  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
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
