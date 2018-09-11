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

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio'   ,    			 component :  BienvenidoComponent }, 
  { path: 'home'     ,    			 component :  DashboardComponent  },
  { path: 'peticion' ,    		     component :  SolicitudComponent ,
         children  :  [

  			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  			{ path: 'incidente' , component: IncidenteComponent },
  			{ path: 'dashboard' , component: ResumenComponent },
        { path: 'historial' , component: HistorialComponent },
        { path: 'configurar' , component: ConfigurarComponent },
        { path: 'configurar/detalle/:iddescripcion' , component: AuditarincidenciaComponent },
        { path: 'configurar/detalle/:iddescripcion/historialsolicitud' , component: HistorialsolicitudComponent  } 
          
         


  				 	]
  },

  { path: 'seguridad', component : SeguridadComponent,
      children : [

        { path: 'usuario/:id', component : UsuariosComponent },
        { path: 'formas/:id' , component :  FormaComponent}

      ]

   }

];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
