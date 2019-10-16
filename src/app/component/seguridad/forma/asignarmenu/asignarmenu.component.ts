import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import  {MenuServicio} from 'src/app/model/menu_servicio';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import { MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Sub_Menu_Servicio } from 'src/app/model/sub_menu_servicio';
import { UsuariosComponent } from '../../usuarios/usuarios.component';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';



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
    dataSelection : any;
    dataSource2: any;
    displayedColumns: string[] = ['id', 'descripcion', 'icono','select'];
    displayedColumns2: string[] = ['id', 'descripcion', 'acceso','icono','select2'];
    selection = new SelectionModel<any>(false, []);
    selection2 = new SelectionModel<any>(true, []);
    resultado : any;
    
    
   	 // Controlador para los componentes hijos, este caso el paginador.
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatPaginator) paginator2 : MatPaginator;
  @ViewChild(UsuariosComponent) usuarioComponent;

    
  constructor(public dialog: MatDialog,private opcion : PerfilOpcionService,private opcion2: PerfilOpcionService,private _formBuilder: FormBuilder, private _formBuilder1 : FormBuilder) { }




 

  ngOnInit() {

        //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id); 

         // Con esto carga el paginator a los datos del datasource(base de datos)
         this.opcion.getAllMenus().subscribe(r => { 
          this.lista_menu_servicios = r;
          
          this.dataSource =  new MatTableDataSource<any>(this.lista_menu_servicios);
          this.dataSource.paginator2 = this.paginator2;
        });

        // Con esto carga el paginator a los datos del datasource(base de datos)
        this.opcion2.getAllSubMenus().subscribe(r => { 
          this.lista_submenuservicios = r;
          
          this.dataSource2 =  new MatTableDataSource<any>(this.lista_submenuservicios);
          this.dataSource2.paginator2 = this.paginator2;
        });

     

  }

btAsignarMenu(){
  

  var menu_v    = this.selection.selected[0].id;
  var submenu_v = this.selection2.selected;
  var documento = this.usuarioComponent.selection3.selected[0].documento;
  
   
  for (var i = 0; i<= submenu_v.length-1; i++) {
    
      console.log(submenu_v[i].id_sbmenu);
      var idsbmenu = submenu_v[i].id_sbmenu;

      this.opcion.asignarRolesPerfiles(menu_v,idsbmenu,documento).subscribe(r  => {

      });

  }

  console.log(this.selection.selected[0].id); 

  console.log(this.selection2.selected);

  console.log(this.usuarioComponent.selection3.selected[0].documento);

  const dialogRef = this.dialog.open(DialogAsignarMenu, {
    width: '350px',
    height: '180px'
    
  });
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  
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

    if (this.dataSource2.paginator2) {
      this.dataSource2.paginator2.firstPage();
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

@Component({
  selector: 'app-asignarmenu',
  templateUrl : 'dialogservicioasignado.html'
 
})

export class DialogAsignarMenu{

  constructor(
    public dialogRef: MatDialogRef<DialogAsignarMenu>,
    @Inject(MAT_DIALOG_DATA)DialogAsignarMenu , private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



  btAceptar():void{

    window.location.reload();
  
   
  
  }



}