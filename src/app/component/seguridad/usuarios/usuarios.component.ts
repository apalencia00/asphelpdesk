import { Component, OnInit, ViewChild }    from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { CrearusuarioComponent }           from './crearusuario/crearusuario.component';
import {MatDialog, MatDialogRef }          from '@angular/material';
import { Usuario } from 'src/app/model/usuario';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { SelectionModel } from '@angular/cdk/collections';
import { UsuarioAsignado } from 'src/app/model/usuarioasignado';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

 // Controlador para los componentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;
	lista_usuario : Usuario[];
  resultado : any;
  displayedColumns: string[] = ['id', 'documento','nombre','apellido','perfil','estado','editar','vermenu','select'];
  dataSource: any;
	selection3 = new SelectionModel<UsuarioAsignado>(false, []);
  documento: any;


    constructor(public dialog: MatDialog, private user : CrearUsuarioService) { }

    crearUsuario(): void {
    const dialogRef = this.dialog.open(CrearusuarioComponent, {
      width: '500px',
      height: '400px'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });

  }

  	ngOnInit () {
      //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id); 
        // Con esto carga el paginator a los datos del datasource(base de datos)
        this.user.listarUsuarios().subscribe(r => { 
          this.lista_usuario = r;
        
        this.dataSource =  new MatTableDataSource<any>(this.lista_usuario);
        this.dataSource.paginator = this.paginator;
      });



  }


  /*
  btAsignarMenu(){


    console.log(this.selection.selected[0]);  

  }

*/


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection3.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection3.clear() :
        this.dataSource.data.forEach(row => this.selection3.select(row));
  }


  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarUsuario():void{

var user_clear = this.selection3.selected[0].documento;


this.user.eliminarUsuario(user_clear).subscribe (r=>{
var respuesta_eliminado = r;


console.log(respuesta_eliminado);

});
  }

  
}
  
