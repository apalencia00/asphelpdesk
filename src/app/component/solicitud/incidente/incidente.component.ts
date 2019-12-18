import { Component, OnInit, ViewChild, ElementRef,Inject } 	 from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule,FormGroup,FormBuilder  } from '@angular/forms';
import { PusherService } from 'src/app/service/pusher.service';
import { MatSnackBar,MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { CrearIncidenteService } from 'src/app/service/crear-incidente.service';
import { Incidente } from 'src/app/model/incidente';
import { Asunto } from 'src/app/model/asunto';
import { DialogoverviewComponent } from '../../dialogoverview/dialogoverview.component';
import { DISABLED } from '@angular/forms/src/model';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { BienvenidoComponent } from '../../bienvenido/bienvenido.component';
import { HttpHeaders } from '@angular/common/http';

const yourHeadersConfig = {

  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded,application/json',
    'responseType':  'ResponseContentType.Json',
    'withCredentials': 'false',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding'

  })

}



export interface DialogData {
  elservicio: any;
  
}



@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css']
})



export class IncidenteComponent implements OnInit {

  
  eltipo : any;
  isLinear          : boolean = true;
  idservicio        : any;
  servicio          : string;
  mostrar           : boolean = false;
  incidentes        : Incidente[];
  asuntos           : Asunto[];
  incide_ob = new Incidente();
  datos             : any;
  nombres            : string = '';
  sucursal          : string = '';
  direccion         : string = '';
  firstFormGroup    : FormGroup;
  secondFormGroup   : FormGroup;
  respuesta         : any;
  punto             : number = 0;
  idpunto           : String = '';
  arrayCadena = [];
  pcaracter         : string ;
  scaracter         : string ;
  tcaracter         : string ;
  public loading = false;
  fileToUpload: File = null;
  archivosubido : any;

  dataSource: any;

  @ViewChild(BienvenidoComponent) bienvenidoComponent;

  constructor(private _formBuilder: FormBuilder, private _formBuilder1 : FormBuilder ,private pusherService: PusherService,public snackBar: MatSnackBar, private inciden : CrearIncidenteService,public dialog: MatDialog, public router: Router) { }
  fileData : File = null;

  ngOnInit() {
    
     //console.log("aaa"+localStorage.getItem("token"));
     var id = Number(window.localStorage.getItem("token"));
     
     console.log(id);

     if ( id == 0 ) {

      window.localStorage.removeItem("token");
      window.localStorage.clear();
      this.router.navigate(['/']);

     }  

    
    //this.cargarAsunto();
    this.servicio   = this.obtenerUltimoServicio();
    this.idservicio = this.obtenerUltimoServicio();

     this.firstFormGroup = this._formBuilder.group({  

      nombres      : ['', Validators.minLength(6)],
      solicitante : ['', Validators.required],
      cedula      : ['', Validators.required],
      sucursal    : ['', Validators.minLength(4)],
      direccion   : ['', Validators.minLength(11)],
      punto       : null,
      idpunto     : ['', Validators.required]

        });

      this.secondFormGroup = this._formBuilder1.group({

          recepcion   : 0,
          obs         : ['', Validators.required],
          avatar      : null,
          asunto      : [0,Validators.required],

        });
        
        
  }

  handleFileInput(fileInput: any) {
      
    this.fileData = <File>fileInput.target.files[0];

}

uploadFileToActivity() {
  this.inciden.postFile(this.fileData).subscribe(data => {

    this.respuesta = data;

    if ( this.respuesta != null ){

      this.snackBar.open("Evento Aplicacion", this.respuesta, {
        duration: 4000,
      });
      
    }
    
    }, error => {
      console.log(error);
    });

  }

/*   cargarAsunto() : void {

    this.inciden.cargaAsunto().subscribe(as => {
      this.asuntos = as;
    });

  }
 */

  buscarPersona(event) : void {
      event.preventDefault();
    if ( event.keyCode == 13 ) {
        
      const formModel = this.firstFormGroup.value;
      var mivar = formModel.cedula;
      //console.log(mivar);

      this.inciden.buscarPersona(mivar).subscribe(r => {
        
        this.datos = r;

        if ( this.datos != null ){
            console.log(this.datos.nombres);
          this.nombres    =     ''+this.datos.nombres;
          //this.sucursal  =     ''+this.datos.sucursal;
          //this.direccion =     ''+this.datos.direccion;
          //this.idpunto   =     this.datos.punto;

        } 
        

      });

    }

  }

  buscarPV(event) : void{

    event.preventDefault();
    if ( event.keyCode == 13 ) {

      const formModel = this.firstFormGroup.value;
      var mivar2 = formModel.idpunto;
      //console.log(mivar2);

      this.inciden.buscarPV(mivar2).subscribe(r => {

        this.datos = r;
        console.log(this.datos);

        if ( this.datos == null ) {

          const dialogRef = this.dialog.open(DialogInfo, {
            width: '450px',
            data: {  }
          });
    
         
        }else{

          this.sucursal  =     ''+this.datos.nombrecda;
          this.direccion =     ''+this.datos.nombrepunto;
          //this.idpunto   =        this.datos.punto;

        }
        

      });

    }

  }

  filtroSolicitud(dato : any){


    let asunto = new Asunto();


    if ( dato == 1 ) {
      this.asuntos = [ 
        
        
      {
        id : 1,
        descripcion : "Problemas De Conexion Internet",
        estado : "A"
      },

      {

        id : 2,
        descripcion : "Problemas de Software",
        estado : "A"

      },

      {

        id : 3,
        descripcion : "Problemas de Equipo",
        estado : "A"

      },

      



      ]
    }else{

      this.asuntos = [ 

        {

          id : 4,
          descripcion : "Problemas con Camaras de Seguridad",
          estado : "A"
  
        },
  
        {
  
          id : 5,
          descripcion : "Problemas de Electricidad",
          estado : "A"
  
        }

      ]

    }

  }



  subirArchivo(event) {

    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
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

  obtenerUltimoServicio() : string {

    var stringserv = '';


    this.inciden.ultimoServicio().subscribe(
      res => {
          this.idservicio = res.idservicio;
          this.servicio   = res.servicio;
          stringserv      = this.servicio;
          
          this.arrayCadena = stringserv.split("-");

          this.pcaracter = this.arrayCadena[0];
          this.scaracter = this.arrayCadena[1];
          this.tcaracter = this.arrayCadena[2];
          
          return this.pcaracter+'-'+this.scaracter+'-'+this.idservicio;
         
      });
      
          return "";

  }

  onSubmit(): void {

    const formModel   = this.firstFormGroup.value;
    const formDetalle = this.secondFormGroup.value;
    var tipo_solicitud = 0;


    //console.log(formModel);
    let _incidente = new Incidente();

    if ( formDetalle.recepcion == '1' )
    tipo_solicitud = 1;
    else
    tipo_solicitud = 2;

    

    _incidente.num_servicio                 = '0'+tipo_solicitud+'-';
    _incidente.fk_tipo_solicitante          = formModel.solicitante; //018000112845
    _incidente.identificacion_solictante    = formModel.cedula;
    _incidente.direccion_servicio           = this.direccion;
    _incidente.sucursal                     = this.sucursal ;
    _incidente.tipo_solicitud               = formDetalle.recepcion;
    _incidente.tipo_asunto                  = formDetalle.asunto;
    _incidente.punto_movil_fijo             = 'F' ;
    _incidente.descripcion                  = formDetalle.obs;
    _incidente.fechaser                     = null;
    _incidente.archivo                      = formDetalle.avatar;
    _incidente.fk_usuario                   = 1;
    _incidente.estado                       = "A";
    _incidente.ide_punto                    = formModel.idpunto;

    this.inciden.crearIncidente(_incidente as Incidente).subscribe(
      res => 
         {  
          this.loading = true;
          setTimeout(() => {
            
      
            this.respuesta = res;

            if ( this.respuesta.codigo == 1 ) {
                
            
            this.openDialog();            
            this.loading = false;

          }else{

            this.openDialog(); 

          }
         
         this.loading = false;
         
      
          }, 3000);
          
         
          } 
      
          
      );
   
  }
  loadPage() : void {
    this.loading = true;

  }

    openDialog(): void {  

    
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: { elservicio: this.scaracter ,eltipo: this.pcaracter}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        window.location.reload();
      
      });
  }

}

@Component({
  selector    : 'dialog-overview-example-dialog',
  templateUrl : 'dialog-overview-example-dialog.html',
})


export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector    : 'dialog-info',
  templateUrl : 'dialog-info.html',
})


export class DialogInfo {

  constructor(
    public dialogRef: MatDialogRef<DialogInfo>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

