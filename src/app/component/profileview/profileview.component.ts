
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearUsuarioService } from 'src/app/service/crear-usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';





@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})

export class ProfileviewComponent implements OnInit {
  // Controlador para los componentes hijos, este caso el paginador.
	@ViewChild(MatPaginator) paginator : MatPaginator;
	lista_usuario : Usuario[];
  resultado : any;
  dataSource: any;
  firstFormGroup: FormGroup;
  respuesta: any;
  documento:  string;
  nombre : string;
  apellido: string;
  estado: string;
  menu_servicio :string;
  submenu_servicio :string;

  constructor(private user : CrearUsuarioService, private _formBuilder:FormBuilder) { }

  ngOnInit() {

    
    this.firstFormGroup = this._formBuilder.group({
      documento:  "",
      nombre : "",
      apellido: "",
      estado: "",
      menu_servicio : "",
      submenu_servicio : "",

      });

      var pathname = window.location.pathname;
      var pathsplit = pathname.split('/');
     var usuario = pathsplit[5];
  
      this.user.cargaDatosUsuario(usuario).subscribe(r => { 
        
        this.respuesta  = r;
  
        this.documento         =     ''+usuario;

    });


    
  
    this.user.listarUsuarios().subscribe(r => { 
      this.lista_usuario = r;
    
    this.dataSource =  new MatTableDataSource<any>(this.lista_usuario);
    this.dataSource.paginator = this.paginator;
  });

  }

}
