import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators,ReactiveFormsModule,FormGroup,FormBuilder  } from '@angular/forms';
import { DetalleIncidenciaService } from 'src/app/service/detalle-incidencia.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { AuditoriaIncidente } from 'src/app/model/auditoriaincidente';




@Component({
  selector: 'app-auditarincidencia',
  templateUrl: './auditarincidencia.component.html',
  styleUrls: ['./auditarincidencia.component.css']
})
export class AuditarincidenciaComponent implements OnInit {

  
  step = 0;
  nservicio : string = '';
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


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;

    if ( this.step == 1 ) {

      console.log("este es el final");

    }

  }

  prevStep() {
    this.step--;
  }



    constructor(public snackBar: MatSnackBar, private location : Location, private _formBuilder: FormBuilder, private detalleserv : DetalleIncidenciaService, private incidente : CrearIncidenteService ) {     }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      
      nservicio      : '',
      tservicio      : 0,
      fecha_apertura : [ '', Validators.minLength(10) ],
      solicitante    : [ '', Validators.minLength(11) ],
      sucursal       : [ '', Validators.minLength(6)  ],
      estado         : [ '', Validators.minLength(10) ],
      id_asunto      : 0,
      asunto         : [ '', Validators.minLength(10) ],
      obs            : [ '', Validators.minLength(6)  ],
      identificacion : 0,
      nombre         : [ '', Validators.minLength(6)],
      prioridad      : 0,
      frecepcion     : [ '']
      
      

    });

    this.secondFormGroup = this._formBuilder.group({

      obs_tecnica    : ['', Validators.minLength(10)]

    });
 

    var pathname = window.location.pathname;
    var pathsplit = pathname.split('/');
    var servicio = pathsplit[4];
    console.log(servicio);

    this.detalleserv.cargaDatosSolicitud(servicio).subscribe(r => { 
      
      this.respuesta  = r;
      //console.log(this.respuesta);

        
          this.nservicio         =     ''+this.respuesta.servicio;
          this.fecha_apertura    =     ''+this.respuesta.fecha;
          this.solicitante       =     ''+this.respuesta.solicitante;
          this.sucursal          =     ''+this.respuesta.sucursal;
          this.estado            =     ''+this.respuesta.estado;
          this.id_asunto         =        this.respuesta.id_asunto;
          this.asunto            =        this.respuesta.asunto;
          this.obs               =        this.respuesta.descripcion;

    });

    this.detalleserv.cargaDatosPersonalTecnico().subscribe(r => {
      this.tecnicos = r;
      
     
      
    });


  }

  submitea() : void{

    console.log(this.respuesta);
      
    let auditinc = new AuditoriaIncidente();
    var tipo_urgencia  = this.firstFormGroup.get('prioridad').value;
    var identificacion = this.firstFormGroup.get('identificacion').value;
    var tipo_servicio  = this.firstFormGroup.get('tservicio').value;
    var fecha_recep    = this.firstFormGroup.get('frecepcion').value;
    

    

    auditinc.tipo_urgencia       = tipo_urgencia;
    auditinc.tecnico_responsable = identificacion;
    auditinc.tipo_servicio       = tipo_servicio;
    auditinc.obs                 = this.respuesta.descripcion;
    auditinc.fecha_apertura      = this.respuesta.fecha;
    auditinc.fecha_recepcion     = fecha_recep;
    auditinc.num_servicio        = this.nservicio;
    auditinc.fk_usuario          = 1;

    this.incidente.asignarServicio(auditinc as AuditoriaIncidente).subscribe(r => {
        this.asignacion = r;

        this.snackBar.open(this.respuesta.operacion, "Aceptar", {
          duration: 4000,
        });

    });
     
    
  }

  agregarObs() : void{

    
    var obs_tecnicas   = this.secondFormGroup.get('obs_tecnica').value;
    var num_servicio   = this.nservicio;
    console.log(obs_tecnicas);

    this.incidente.agregarNotas(num_servicio, obs_tecnicas).subscribe(r=> {

      this.snackBar.open(this.respuesta.operacion, "Aceptar", {
        duration: 4000,
      });

    })

  }

  goBack(){
  		this.location.back();
  }

}
