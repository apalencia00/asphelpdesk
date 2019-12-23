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

	version = VERSION;
  snackBar: any ='';

  constructor(private _formBuilder : FormBuilder,private login: PerfilOpcionService, private router : Router,public dialog: MatDialog ) { 

  }

    
  ngOnInit() {

    //Validar session on redis server

    this.login.validarSessionOnRedis(window.localStorage.getItem("token")).subscribe(res => {
      if ( window.localStorage.getItem("tokenredis") != "" ) {    
      this.router.navigate(['/peticion/dashboard']);
        }else{
        this.router.navigate(['/home']);
        }
    });

    if ( this.isLogged ) {
        console.log("Testeando Bienvenido Login");
        this.cerrarSession();

    } 

    this.loginForm = this._formBuilder.group({

      usuario : ['CSA1140824197', Validators.minLength(6)],
      clave   : ['1140824197', Validators.minLength(6)]

    });

  }

  onSubmit() { 
   
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
        //window.localStorage.setItem("sessionid", hash_session);
        window.localStorage.setItem("token", ""+this.respuesta.id);
        window.localStorage.setItem("tokenredis", ""+hash_session);
        window.localStorage.setItem("usuario", this.respuesta.nombre + "   " + this.respuesta.apellido);
        window.localStorage.setItem("perfilUsuario", this.respuesta.tipo_perfil+ "");
        
        if ( this.respuesta.tipo_perfil != 1000 ) {
        this.router.navigate(['/peticion/dashboard']);
        }else{
        this.router.navigate(['/home']);
        }

      }else{
        Swal.fire(
          ' Ingreso no permitido ',
          ' Comunicarse con un administrador del aplicativo ',
         'error'
        )   
       
      
      }
 
    
    }, 

 
      
      
      );

       
  }

  loadPage() : void {
    this.loading = false;
  }

  isLogged() {
    return window.localStorage.getItem("token");
  }
 openDialog(): void {  
      const dialogRef = this.dialog.open(DialogLogin, {
        data : {elservicio :this.respuesta.valido},
        width: '475px',

      });
  }

  cerrarSession(){

    if( this.isLogged() != null ){

      window.localStorage.clear();
      window.localStorage.removeItem("token");
      this.router.navigate(['/']);
      console.log(window.localStorage.getItem("token"));

    }

  }


}

@Component({
  selector    : 'dialog-login',
  templateUrl : 'dialog-login.html'
 
  
  
})

export class DialogLogin {

  constructor(
    public dialogRef: MatDialogRef<DialogLogin>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

