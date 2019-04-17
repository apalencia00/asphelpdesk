import { Component, OnInit, ViewChild, ElementRef } 	 from '@angular/core';
import {FormControl, Validators,ReactiveFormsModule,FormGroup,FormBuilder  } from '@angular/forms';
import { PusherService } from 'src/app/service/pusher.service';
import {MatSnackBar} from '@angular/material';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Incidente } from 'src/app/model/incidente';
import { Asunto } from 'src/app/model/asunto';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css']
})



export class IncidenteComponent implements OnInit {



  mostrar : boolean = false;
  incidentes : Incidente[];
  asuntos     : Asunto[];
  incide_ob = new Incidente();
  datos : any;
  nombre : string = '';
  sucursal : string = '';
  direccion : string = '';
  firstFormGroup: FormGroup;
  respuesta : any;
  punto : number = 0;
  idpunto : number = 0;

  constructor(private _formBuilder: FormBuilder,private pusherService: PusherService,public snackBar: MatSnackBar, private inciden : CrearIncidenteService) { }

  ngOnInit() {

    const canal = this.pusherService.getChannel();
    console.log("micanal :");
    console.log(canal);
    this.cargarAsunto();

    canal.bind('my-event', function( data ) {
      
    });

 
     this.firstFormGroup = this._formBuilder.group({

      nombre      : ['', Validators.minLength(6)],
      fecha       : ['', Validators.required],
      solicitante : ['', Validators.required],
      cedula      : ['', Validators.required],
      sucursal    : ['', Validators.minLength(4)],
      direccion   : ['', Validators.minLength(11)],
      recepcion   : 0,
      obs         : ['', Validators.required],
      avatar      : null,
      asunto      : 0,
      punto       : null,
      idpunto     : ['', Validators.minLength(4)]

        });
    
  	
  }

  cargarAsunto() : void {

    this.inciden.cargaAsunto().subscribe(as => {
      this.asuntos = as;
    });

  }

  buscarPersona(event) : void {
      event.preventDefault();
    if ( event.keyCode == 13 ) {
        
      const formModel = this.firstFormGroup.value;
      var mivar = formModel.cedula;
      //console.log(mivar);

      this.inciden.buscarPersona(mivar).subscribe(r => {
        
        this.datos = r;

        if ( this.datos != null ){

          this.nombre    =     ''+this.datos.solicitante;
          this.sucursal  =     ''+this.datos.sucursal;
          this.direccion =     ''+this.datos.direccion;
          this.idpunto   =     this.datos.punto;

        }
        

      });

    }

  }

  subirArchivo(event) {

    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.firstFormGroup.get('avatar').setValue({
          filename: file.name,
          filetype: file.type
          //value: reader.result.split(',')[1]
        })
      };
    }

  }

 
  onSubmit(): void {

    const formModel = this.firstFormGroup.value;

    //console.log(formModel);
    let _incidente = new Incidente();

    var _direccion    = this.firstFormGroup.get('direccion').value;
    console.log(_direccion);


    _incidente.num_servicio                 = 'PAN-01-';
    _incidente.fk_tipo_solicitante          = formModel.solicitante; //018000112845
    _incidente.identificacion_solictante    = formModel.cedula;
    _incidente.direccion_servicio           = this.direccion;
    _incidente.sucursal                     = formModel.sucursal ;
    _incidente.tipo_solicitud               = formModel.recepcion;
    _incidente.tipo_asunto                  = formModel.asunto;
    _incidente.punto_movil_fijo             = '' ;
    _incidente.descripcion                  = formModel.obs;
    _incidente.fechaser                     = formModel.fecha;
    _incidente.archivo                      = formModel.avatar;
    _incidente.fk_usuario                   = 1;
    _incidente.estado                       = "A";
    _incidente.ide_punto                    = this.idpunto;

    this.inciden.crearIncidente(_incidente as Incidente).subscribe(r => 
         {  
          console.log("listo bacano el post");
          } 
      
      );



    setTimeout(() => {
      console.log(formModel);
      this.mostrar = true;

      this.pusherService.get("hola").subscribe(
        res => { 
          this.respuesta = res;
          
          this.snackBar.open(this.respuesta.dato, "Aceptar", {
            duration: 4000,
          });
          
          this.mostrar = false;
      },
  
        res => {
        }
  
         );
  

    }, 1000);

   
  }

  

}
