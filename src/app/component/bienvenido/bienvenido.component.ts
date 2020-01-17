import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl,ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import { PerfilOpcionService }  from '../../service/perfil-opcion.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { Usuario } from '../../model/usuario';
import { sha256, sha224 } from 'js-sha256';
import { injectTemplateRef } from '@angular/core/src/render3';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



export interface DialogData {
  usuario: any;
}

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css','./util.css']
})
export class BienvenidoComponent implements OnInit {

  loginForm : FormGroup;
  result    : string;
  respuesta  : Usuario = null;
  usuario   : any = '' ;
  clave     : any = '';
  nombreperfil : any;
  public loading = false;
  validaredis : any;

	version = VERSION;
  snackBar: any ='';

  constructor(private _formBuilder : FormBuilder,private login: PerfilOpcionService, private router : Router,public dialog: MatDialog ) { 

  }

    
  ngOnInit() {

          console.log(window.localStorage.getItem("token"))

     this.login.validarSessionOnRedis(window.localStorage.getItem("token")).subscribe(res => {
        this.validaredis = res;
        console.log(this.validaredis);
        var perfilus = Number(this.validaredis.sessionperfil);
           /* if ( this.validaredis != null ) {
             if ( perfilus == 1000 ) {
              this.router.navigate(['/home'])
             }else{
              this.router.navigate(['/peticion/'])
             }
        }else{
          this.router.navigate(['/apphelpu']);
        }    */
    });



    if ( this.isLogged ) {
        console.log("Testeando Bienvenido Login");
        //this.cerrarSession();

    } 

    this.loginForm = this._formBuilder.group({

      usuario : ['', Validators.minLength(6)],
      clave   : ['', Validators.minLength(6)]

    });

  }

  onSubmit() {
    
    if ( this.loginForm.get('usuario').value != "" || this.loginForm.get('clave').value != "" ) {
   
            this.loading = true;
            let timer = Observable.timer(3000,1000);
            timer.subscribe(t=> this.loadPage());
            var hash = sha256(this.loginForm.get('clave').value);
                
            var encodeURL = sha256("helpdesk");
            console.log(hash); 
            
            this.login.accesoUsuario(this.loginForm.get('usuario').value, hash).subscribe(r => {
              this.respuesta = r;
              console.log(this.respuesta);
              var hash_session = sha256(this.loginForm.get('usuario').value + '#' + hash);
              if (this.respuesta.documento != '' &&  this.respuesta.estado == 'A' ) {
              

                window.localStorage.setItem("token", ''+this.respuesta.id);
                window.localStorage.setItem("perfilUsuario", this.respuesta.tipo_perfil+ "");
                
                
                if ( this.respuesta.tipo_perfil != 1000 ) {
                this.router.navigate(['/peticion/dashboard']);
                }else{
                this.router.navigate(['/home']);
                }

              }else{
                Swal.fire(
                  'Evento de aplicacion',
                  this.respuesta.valido,
                'error'
                )   
              
              
              }

            });

       
  }else{
    Swal.fire(
      ' Evento de Aplicacion ',
      ' Usuario y/o contraseña no validas ',
    'error'
    )   
  
  
  }

 
  }
  loadPage() : void {
    this.loading = false;
  }

  isLogged() {
    return window.localStorage.getItem("token");
  }


  cerrarSession(){

    

      this.login.cerrarSessionOnRedis('CSA'+this.loginForm.get('usuario').value).subscribe(res => {
        let responsesf = res;
        console.log(responsesf)
        window.localStorage.clear();
        window.localStorage.removeItem("token");
      });
      //this.router.navigate(['/']);
      
    

  }






}




