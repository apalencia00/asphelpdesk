
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuServicio } from 'src/app/model/menu_servicio';
import { Sub_Menu_Servicio } from 'src/app/model/sub_menu_servicio';
import { ProfileUser } from 'src/app/model/profileuser';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})

export class ProfileviewComponent implements OnInit {

  // Controlador para los componentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;
	lista_usuario : ProfileUser[];
  resultado : any;
  dataSource: any;
  firstFormGroup: FormGroup;
  respuesta: any;
  tipo_documento: string;
  documento:  string;
  nombre : string;
  apellido: string;
  estado: string;
  menu_servicio : MenuServicio[];
  submenu_servicio: Sub_Menu_Servicio[];
  displayedColumns: string[] = ['tipo_documento', 'documento','nombre','apellido','estado','menu_servicio','submenu_servicio'];



  constructor(private user : CrearUsuarioService, private _formBuilder:FormBuilder , private loadProfile : CrearUsuarioService) { }

  ngOnInit() {

// Con esto carga el paginator a los datos del datasource(base de datos)
this.user.cargarUsuarioPerfil().subscribe(r => { 
  this.lista_usuario = r;

this.dataSource =  new MatTableDataSource<any>(this.lista_usuario);
this.dataSource.paginator = this.paginator;
console.log(this.dataSource);
console.log(this.lista_usuario);
});
    
    

      var pathname = window.location.pathname;
      var pathsplit = pathname.split('/');
     var usuario = pathsplit[5];
  
      this.user.cargaDatosUsuario(usuario).subscribe(r => { 
      this.user.cargarUsuarioPerfil();

        this.respuesta  = r;
  
        this.documento         =     ''+usuario;
    console.log(usuario);
    });


    this.loadProfile.cargarUsuarioPerfil();
    

  }

  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
