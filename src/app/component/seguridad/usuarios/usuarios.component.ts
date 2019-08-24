import { Component, OnInit, ViewChild }    from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { CrearusuarioComponent }           from './crearusuario/crearusuario.component';
import {MatDialog, MatDialogRef }          from '@angular/material';
import { Usuario } from 'src/app/model/usuario';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';


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
  displayedColumns: string[] = ['id', 'documento', 'nombre','apellido','editar'];
  dataSource: any;
	



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
        // Con esto carga el paginator a los datos del datasource(base de datos)
        this.user.listarUsuarios().subscribe(r => { 
          this.lista_usuario = r;
        
        this.dataSource =  new MatTableDataSource<any>(this.lista_usuario);
        this.dataSource.paginator = this.paginator;
      });
 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
  
