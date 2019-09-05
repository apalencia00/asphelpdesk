import { NgModule } 						      from '@angular/core';
import { RouterModule, Routes } 			from '@angular/router'; 
import { BienvenidoComponent } 				from './component/bienvenido/bienvenido.component';
import { DashboardComponent } 				from './component/dashboard/dashboard.component';
import { SolicitudComponent }         from './component/solicitud/solicitud.component';
import { IncidenteComponent }   			from './component/solicitud/incidente/incidente.component'; 
import { ResumenComponent }           from './component/solicitud/resumen/resumen.component';
import { HistorialComponent }         from './component/solicitud/historial/historial.component';
import { ConfigurarComponent }        from './component/solicitud/configurar/configurar.component';
import { AuditarincidenciaComponent } from './component/solicitud/auditarincidencia/auditarincidencia.component';
import { HistorialsolicitudComponent } from './component/solicitud/configurar/historialsolicitud/historialsolicitud.component'; 
import { SeguridadComponent }          from './component/seguridad/seguridad.component'; 
import { UsuariosComponent }           from './component/seguridad/usuarios/usuarios.component';  
import { FormaComponent }              from './component/seguridad/forma/forma.component';
import { ServicioasignadoComponent }   from './component/solicitud/servicioasignado/servicioasignado.component';
import { DetalleservicioasignadoComponent } from './component/solicitud/servicioasignado/detalleservicioasignado/detalleservicioasignado.component';
import { DetallemisolicitudComponent } from './component/detallemisolicitud/detallemisolicitud.component';
import { PuntoventaComponent } from './component/solicitud/puntoventa/puntoventa.component';
import { ServicioseguridadComponent } from './component/servicioseguridad/servicioseguridad.component';
import { DetalleservicioseguridadComponent } from './component/servicioseguridad/detalleservicioseguridad/detalleservicioseguridad.component';
import { PermisosFormasAsignadasComponent } from './component/seguridad/permisos-formas-asignadas/permisos-formas-asignadas.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AsignarmenuComponent} from './component/seguridad/forma/asignarmenu/asignarmenu.component'; 
import { CierreservicioComponent } from './component/solicitud/cierreservicio/cierreservicio.component';
import { ProfileviewComponent } from './component/profileview/profileview.component';
const routes: Routes = [
  { path: '/', redirectTo: '/', pathMatch: 'full' },
  { path: '/'   ,    			 component :  BienvenidoComponent }, 
  { path: 'home'     ,    			 component :  DashboardComponent  },
  { path: 'peticion' ,    		   component :  SolicitudComponent ,
         
  children  :  [

  			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'incidente',                                              component: IncidenteComponent },
        { path: 'cerrarservicio',                                         component: CierreservicioComponent },
  			{ path: 'dashboard',                                              component: ResumenComponent },
        { path: 'historial',                                              component: HistorialComponent },
        { path: 'historial/vermisolicitudes/:idservi',                    component: DetallemisolicitudComponent },
        { path: 'configurar',                                             component: ConfigurarComponent },
        { path: 'configurar/detalle/:iddescripcion',                      component: AuditarincidenciaComponent },
        { path: 'configurar/detalle/:iddescripcion/historialsolicitud',   component: HistorialsolicitudComponent  } ,
        { path: 'configurar/detalle/:iddescripcion/cerrarServicio', component:CierreservicioComponent},
        { path: 'asignacion',                                             component: ServicioasignadoComponent },
        { path: 'asignacion/detalleasginado/:idservi',                    component: DetalleservicioasignadoComponent },
        { path: 'asignacion/detalleasginado/:idservi/historialsolicitud', component: HistorialsolicitudComponent  } ,
        { path: 'puntosv'                                           , component: PuntoventaComponent},
        { path: 'sseguridad'                                      , component: ServicioseguridadComponent },
        { path: 'sseguridad/detalleservicioseguridad/:idservi'   , component: DetalleservicioseguridadComponent },
        
      
      ]
  },

  {       path: 'seguridad', component : SeguridadComponent,
          children : [

        { path: 'usuario/:id', component :  UsuariosComponent  },
        { path: 'perfil/:id', component :  ProfileviewComponent  },
        { path: 'formas/:id' , component :  FormaComponent    },
        { path: 'formas/:id/asignarMenu' , component :  AsignarmenuComponent    },
        { path: 'funciones'  , component : PermisosFormasAsignadasComponent },
        { path: 'usuario/:id/editar-usuario/:element.documento', component :  EditarUsuarioComponent },
        { path: 'funciones'  , component : PermisosFormasAsignadasComponent },
       
      ]

   }

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
