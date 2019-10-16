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
  usuarios  : Usuario[];
  usuario   : any = '' ;
  clave     : any = '';
  nombreperfil : any;

	version = VERSION;
  snackBar: any ='';
  


  constructor(private _formBuilder : FormBuilder,private login: PerfilOpcionService, private router : Router,public dialog: MatDialog ) { 

  }

    
  ngOnInit() {

    if ( this.isLogged ) {
        console.log("Testeando Bienenido Login");
        this.cerrarSession();

    } 

    this.loginForm = this._formBuilder.group({

      usuario : ['CSA1140824197', Validators.minLength(6)],
      clave   : ['1140824197', Validators.minLength(6)]

    });

  }

  onSubmit() { 
   
    var hash = sha256(this.loginForm.get('clave').value);
    var clave_kevin = sha256('1140894680');
    
    var encodeURL = sha256("helpdesk");
    console.log(hash); 
    
    this.login.accesoUsuario(this.loginForm.get('usuario').value, hash).subscribe(r => {
      this.usuarios = r;
      console.log(this.usuarios[0].nombre);
      this.usuarios[0].nombre = this.nombreperfil;
      console.log(this.nombreperfil);
      if (this.usuarios[0] != null ) {
        console.log(this.usuario);
        window.localStorage.setItem("token", ""+this.usuarios[0].id);
        

        if ( this.usuarios[0].tipo_perfil != 1000 ) {
        this.router.navigate(['/peticion/incidente']);
        }else{
        this.router.navigate(['/home']);
        }

      }else{
         this.result = 'Usuario y/o Contraseña son invalidos, por favor rectifique';
         console.log(this.result);

        this.openDialog();


      }
    }, 

    r => {
      console.log(this.usuarios);
      this.result = 'Error grave, contacte al administrador del sistema';
      
    }      
      );
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

