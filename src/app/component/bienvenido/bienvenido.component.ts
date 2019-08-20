import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl,ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import { PerfilOpcionService }  from '../../service/perfil-opcion.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { Usuario } from '../../model/usuario';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  loginForm : FormGroup;
  result    : string;
  usuarios  : Usuario[];
  usuario   : any = '' ;
  clave     : any = '';

	version = VERSION;

  constructor(private _formBuilder : FormBuilder,private login: PerfilOpcionService, private router : Router) { }

    
  ngOnInit() {

    this.loginForm = this._formBuilder.group({

      usuario : ['CSA1140824197', Validators.minLength(6)],
      clave   : ['1140824197', Validators.minLength(6)]

    });

  }

  onSubmit() { 
    
  
    var hash = sha256(this.loginForm.get('clave').value);
    var encodeURL = sha256("helpdesk");
    //console.log(hash);
    
    this.login.accesoUsuario(this.loginForm.get('usuario').value, this.loginForm.get('clave').value).subscribe(r => {
      this.usuarios = r;
      console.log(this.usuarios);
      if (this.usuarios[0] != null ) {
        //console.log(this.usuario);
        localStorage.setItem("token", ""+this.usuarios[0].id);
        

        if ( this.usuarios[0].tipo_perfil != 1000 ) {
        this.router.navigate(['/peticion/incidente']);
        }else{
        this.router.navigate(['/home']);
        }

      }else{
        this.result = 'Usuario y/o Contraseña son invalidos, por favor rectifique';
        console.log(this.result);
      }
    }, 

    r => {

      console.log(this.usuarios);
      this.result = 'Error grave, contacte al administrador del sistema';
      
    }      
      );
  }

  isLogged() {
    return localStorage.getItem("token") != null;
  }



}
