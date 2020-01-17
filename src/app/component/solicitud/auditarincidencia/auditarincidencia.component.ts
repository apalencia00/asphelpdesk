

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common'; 
import {MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatStepper} from '@angular/material';
import {FormControl, Validators,ReactiveFormsModule,FormGroup,FormBuilder  } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { AuditoriaIncidente } from 'src/app/model/auditoriaincidente';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CdkStepper } from '@angular/cdk/stepper';
import Swal from 'sweetalert2';

export interface DialogData{


  larespuesta : any;
}

@Component({
  selector: 'app-auditarincidencia',
  templateUrl: './auditarincidencia.component.html', 
  styleUrls: ['./auditarincidencia.component.css']
})
export class AuditarincidenciaComponent implements OnInit { 

  
  @ViewChild('stepper') stepper : MatStepper;
  nservicio : any;
  tservicio : number = 0;
  fecha_apertura : any;
  solicitante : any;
  sucursal : any;
  estado  : any;
  id_asunto : number;
  asunto : string;
  obs : string;
  tecnicos : any = [];
  respuesta : any = [];
  firstFormGroup: FormGroup;
  secondFormGroup : FormGroup;
  prioridad : any;
  obs_tecnica : any;
  asignacion : any[];
  frecepcion : any;
  public loading = false;
  usuario : any;
  elmensaje : any;
  datos:any;
  nombresolicitante: any;
  tecnicosnuevo : any;
  idusuario : any;
  respuestaobs : any;

  setStep(index: number) {
    this.stepper.selectedIndex = index;
  }

  getStep() {
   return this.stepper.selectedIndex;
  }



    constructor(public router : Router,public snackBar: MatSnackBar, private location : Location, private _formBuilder: FormBuilder, private detalleserv : DetalleIncidenciaService, private incidente : CrearIncidenteService, public dialog: MatDialog, private inciden  : CrearIncidenteService) {     }

  ngOnInit() {

     //console.log("aaa"+localStorage.getItem("token"));
   this.idusuario  = Number(window.localStorage.getItem("token"));
    
     console.log(this.idusuario);

     if ( this.idusuario == 0 ) {

      
      window.localStorage.removeItem("token");
      window.localStorage.clear();
      this.router.navigate(['/']);

     }  

    this.firstFormGroup = this._formBuilder.group({
      
      nservicio      : [''],
      fecha_apertura : [ '', Validators.minLength(10) ],
      solicitante    : [ '', Validators.minLength(11) ],
      sucursal       : [ '', Validators.minLength(6)  ],
      estado         : [ '', Validators.minLength(10) ],
      id_asunto      : [Validators.required],
      asunto         : [ '', Validators.minLength(10) ],
      obs            : [ '', Validators.minLength(6)  ],
      identificacion : ['', Validators.required],
      identificacion2 : [ ''],
      nombre         : [ '', Validators.minLength(6)],
      frecepcion     : [ '']
      
      

    });

    this.secondFormGroup = this._formBuilder.group({

      obs_tecnica    : ['', Validators.minLength(10)]

    });
 

    var pathname = window.location.pathname;
    var pathsplit = pathname.split('/');
    var servicio = pathsplit[4];
  //  console.log(servicio);

    this.detalleserv.cargaDatosSolicitud(servicio).subscribe(r => { 
      
      this.respuesta  = r;
      //console.log(this.respuesta);
      this.nservicio         =     ''+this.respuesta.servicio;
      this.fecha_apertura    =     ''+this.respuesta.fecha;
      this.solicitante       =     ''+this.respuesta.documento;
      this.sucursal          =     ''+this.respuesta.sucursal;
      this.estado            =     ''+this.respuesta.estado;
      this.id_asunto         =        this.respuesta.id_asunto;
      this.asunto            =        this.respuesta.asunto;
      this.obs               =        this.respuesta.descripcion;

      this.inciden.buscarPersona(this.respuesta.documento).subscribe(l => {
        
          this.datos= l;
          this.nombresolicitante =     ''+this.datos.nombres;
          
        });

        if ( this.respuesta != null ) {

          this.detalleserv.cargaDatosPersonalTecnico(this.respuesta.servicio).subscribe(r => {
            this.tecnicos = r;
            
          });

         
        }else{
          this.detalleserv.cargaDatosPersonalTecnico("").subscribe(r => {
            this.tecnicos = r;
            
          });
        }

        this.detalleserv.cargaDatosPersonalTecnicoAsignado(this.respuesta.servicio).subscribe(r => {
          this.tecnicosnuevo = r;
          
        });


    });


      // validar si tecnico de servicio asignado es el mismo que esta en sesion

      

  }



  submitea() : void{
    
   if ( this.getStep() == 0 ) {

            console.log(this.respuesta);
              
            let auditinc = new AuditoriaIncidente();
            var tipo_urgencia  = 1;
            var identificacion = this.firstFormGroup.get('identificacion').value;
            var identificacion2 = this.firstFormGroup.get('identificacion2').value;
            var tipo_servicio  = 1 ;
            var fecha_recep    = this.firstFormGroup.get('frecepcion').value;
        
            auditinc.tipo_urgencia       = tipo_urgencia;
            auditinc.tecnico_responsable = identificacion;
            auditinc.tecnico_nuevo    = identificacion2;
            auditinc.tipo_servicio       = tipo_servicio;
            auditinc.obs                 = this.respuesta.descripcion;
            auditinc.fecha_apertura      = this.respuesta.fecha;
            auditinc.fecha_recepcion     = fecha_recep;
            auditinc.num_servicio        = this.nservicio;
            auditinc.fk_usuario          = this.idusuario;

            if ( tipo_urgencia != 0 && tipo_servicio != 0 && identificacion != 0 ) {

                this.incidente.asignarServicio(auditinc as AuditoriaIncidente).subscribe(r => {
                  this.elmensaje = r;
                  
                   if(this.elmensaje.respuesta != undefined){

                
                    Swal.fire({
                      title: 'Evento de Aplicacion',
                      text: ''+this.elmensaje.respuesta +" "+'A'+ " "+identificacion,
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'OK'
                    }).then((result) => {
                      if (result.value) {
                        
            
                      }
                    })
                  }else{

                    Swal.fire(
                      'Evento de Aplicacion',
                      'No se ha realizado la asignacion',
                      'error'
                    )
                  }        

                });

                this.loading = true;
                setTimeout(() => {
      
                  this.loading = false;
            
                }, 3000);
              

        this.setStep(1);
      }else{

        Swal.fire(

          'Evento de Aplicacion',
          'Por favor Diligencie los Campos correctamente',
          'error'
        )

      }
        

   } else{

      
        var obs_tecnicas   = this.secondFormGroup.get('obs_tecnica').value;
        var num_servicio   = this.nservicio;
        
        this.incidente.agregarNotas(num_servicio, obs_tecnicas).subscribe(r=> {

          this.respuestaobs = r;
          console.log(this.respuestaobs);
            this.loading = true;
              setTimeout(() => {
                
                
                  Swal.fire({
                    title: 'Evento de Aplicacion',
                    text: ''+this.respuestaobs.operacion,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.value) {
                  this.router.navigate(['../peticion/configurar'])
          window.location.reload();
                    }
                  })
               
                  
           
                  
                
          
                this.loading = false
          
              }, 3000);

  
          
        });

   }


    
  }
  
  loadPage() : void {
    this.loading = false;
  }



  goBack(){
  		this.location.back();
  }

}
@Component({
  selector: 'app-cierreservicio',
  templateUrl: './dialogasignarservicio.html',
  
})
export class DialogAsignarServicio{
  constructor(
    public dialogRef: MatDialogRef<DialogAsignarServicio>,
    @Inject(MAT_DIALOG_DATA)public data: DialogData) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}