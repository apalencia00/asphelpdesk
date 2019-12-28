import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PerfilOpcionService } from 'src/app/service/perfil-opcion.service';
import { Router } from '@angular/router';
import { MenuServicio } from 'src/app/model/menu_servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearsubmenu',
  templateUrl: './crearsubmenu.component.html',
  styleUrls: ['./crearsubmenu.component.css']
})
export class CrearsubmenuComponent implements OnInit {

  nombre: string;
  icono: string;
  menu_servicio: MenuServicio;
  acceso: string;
  lista_opcion : any[];
  respuesta: any;

  firstFormGroup    : FormGroup;
  
  constructor(private _formBuilder: FormBuilder,  private router : Router,public submain: PerfilOpcionService) { }

  ngOnInit() {

//console.log("aaa"+localStorage.getItem("token"));
var id = Number(localStorage.getItem("token"));
//console.log(id); 

 

    this.firstFormGroup = this._formBuilder.group({

    nombre :['',Validators.required],
    icono  :['',Validators.required],
    menu_servicio :['',Validators.required],
    acceso :['',Validators.required],
        });

        this.submain.getAllMenus().subscribe(r => { 
          this.lista_opcion = r;
          
         console.log(this.lista_opcion);
    
          for(var i = 0; i<=this.lista_opcion.length-1; i++){
    
         var nombreMenu= this.lista_opcion[i].descripcion;    
    
        console.log(nombreMenu);
          }
        });
  }
  
  guardarsubMenu():void{
  
  
    const formModel   = this.firstFormGroup.value;
    

  this.submain.crearSubMenu(formModel.nombre,formModel.icono,formModel.menu_servicio,formModel.acceso).subscribe( r => {
  
  r= this.respuesta;
if(this.respuesta !=null){

Swal.fire(

  "El Submenu " +this.respuesta.nombre+" ha sido creado con exito"
)

}
  })
  console.log(formModel);
  
  }




}
