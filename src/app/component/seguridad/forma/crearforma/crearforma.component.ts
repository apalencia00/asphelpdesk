
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import { DialogData } from '../asignarmenu/asignarmenu.component';

export interface DialogData{

elmensaje : any;
elmensaje2 : any;
}


@Component({
  selector: 'app-crearforma',
  templateUrl: './crearforma.component.html',
  styleUrls: ['./crearforma.component.css']
})

export class CrearformaComponent implements OnInit {
  
  nombre: string;
  icono: string;
  firstFormGroup: FormGroup;
respuesta : any;
name :any;
 

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private router : Router,public main: PerfilOpcionService) { }

  ngOnInit() {
    
//console.log("aaa"+localStorage.getItem("token"));
var id = Number(localStorage.getItem("token"));
//console.log(id); 
this.firstFormGroup = this._formBuilder.group({
nombre :['',Validators.required],
icono  :['',Validators.required],

                                          
  });

}


guardarMenu():void {
  
  
  const formModel   = this.firstFormGroup.value;
  
this.main.crearMenu(formModel.nombre,formModel.icono).subscribe( r => {

   r = this.respuesta;

  console.log(r);


  if(formModel.nombre == null || formModel.icono ==null) {
    const dialogRef = this.dialog.open(DialogCrearForma, {
      width: '350px',
      height: '140px',
      data: {elmensaje: "Favor Diligenciar los cambios corespondientes " }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
   
  } if(formModel.nombre != null && formModel.icono !=null){

    const dialogRef = this.dialog.open(DialogCrearForma, {
      width: '350px',
      height: '140px',
      data: {elmensaje2: "El menu ha sido creado con exito" }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });

  }

})
console.log(formModel);

}





}


@Component({
  selector: 'app-crearforma',
  templateUrl : 'dialogcreaforma.html'
 
})


export class DialogCrearForma{

  constructor(
    public dialogRef: MatDialogRef<DialogCrearForma>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}