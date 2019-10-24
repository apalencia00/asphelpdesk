import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl,ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import { PerfilOpcionService }  from '../../service/perfil-opcion.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { Usuario } from '../../model/usuario';
import { sha256, sha224 } from 'js-sha256';
import { DialogData } from '../dialogoverview/dialogoverview.component';

export interface DialogData {
  elservicio: any;
}

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  loginForm : FormGroup;
  result    : string;
  usuarios  : Usuario[]=null;
  usuario   : any = '' ;
  clave     : any = '';
  nombreperfil : any;
  public loading = false;

	version = VERSION;
  snackBar: any ='';

  constructor(private _formBuilder : FormBuilder,private login: PerfilOpcionService, private router : Router,public dialog: MatDialog ) { 

  }

    
  ngOnInit() {

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
     //3fce71bf19bd338dc01a6d9d0c82e5397115d1135c68aec3700818f0e7f6c02a
     
     
    this.login.accesoUsuario(this.loginForm.get('usuario').value, hash).subscribe(r => {
      this.usuarios = r;
      
     
      
     
      if (this.usuarios[0] != null ) {
        console.log(this.usuario);
        window.localStorage.setItem("token", ""+this.usuarios[0].id);
        window.localStorage.setItem("usuario", this.usuarios[0].nombre + "   " + this.usuarios[0].apellido);
        window.localStorage.setItem("id_usuario", ""+this.usuarios[0].documento);

    
        if ( this.usuarios[0].tipo_perfil != 1000 ) {
        this.router.navigate(['/peticion/incidente']);
        }else{
        this.router.navigate(['/home']);
        }

  
      }else{

        this.openDialog();
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

  loadPage() : void {
    this.loading = false;
  }

  isLogged() {
    return window.localStorage.getItem("token");
  }
 openDialog(): void {  
      const dialogRef = this.dialog.open(DialogLogin, {
        data : {elservicio : ''},
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

