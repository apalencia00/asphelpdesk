import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import { UsuariosComponent } from '../../usuarios/usuarios.component';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menususuario',
  templateUrl: './menususuario.component.html',
  styleUrls: ['./menususuario.component.css']
})
export class MenususuarioComponent implements OnInit {

  @ViewChild(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChild(MatPaginator) paginator2 : MatPaginator;
  @ViewChild('uploadResultPaginator', {read: MatPaginator}) uploadResultPaginator: MatPaginator;
@ViewChild(UsuariosComponent) usuarioComponent;
  displayedColumns: string[] = ['id_menu', 'descripcion_menu', 'id_submenu','descripcion_submenu','estado','select'];

  dataSource : any;
  dataSource2: any;
  documento : any;
lista_menu_servicios : any[] = [];
lista_submenuservicios : any;
selection = new SelectionModel<any>(true, []);

  constructor(private opcion:PerfilOpcionService , private user: CrearUsuarioService, private router: Router) { }

  ngOnInit() {


    var myhurl = this.router.url;
    var arrayDeCadenas = myhurl.split("/");
    this.documento = arrayDeCadenas[5];
    //console.log(this.documento)

//console.log(this.router.url);         // Con esto carga el paginator a los datos del datasource(base de datos)
         this.opcion.permisosUsuario(this.documento).subscribe(r => { 
           
          this.lista_menu_servicios = r;
          console.log(this.lista_menu_servicios)
          this.dataSource =  new MatTableDataSource<any>(this.lista_menu_servicios);
          this.dataSource.paginator = this.paginator;

          if(this.lista_menu_servicios == [] || this.lista_menu_servicios.length == 0 ){
            console.log("Entra aqui++");
            Swal.fire({
             title: 'Evento de Aplicacion',
             text: 'El usuario no tiene menu asignados',
             icon: 'warning',
             confirmButtonColor: '#3085d6',
             confirmButtonText: 'OK'
           }).then((result) => {
             if (result.value) {
               
     this.router.navigate(['../seguridad/usuario/1/'])  
             }
           })
           
         }
        });

          
         
       

        // Con esto carga el paginator a los datos del datasource(base de datos)
       
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



  eliminarMenu():void{

   var menu_secundario = this.selection.selected;
   for(var i = 0 ; i <= menu_secundario.length-1;i++){
    var menu_select =  menu_secundario[i].id_menu_secundario;
    console.log(menu_select);

  this.opcion.eliminarMenu(menu_select).subscribe (r=>{
  var respuesta_eliminado = r;

  Swal.fire(
    'Evento de Aplicacion',
  respuesta_eliminado,
    'info'


  )
  });
  }

  }

}
