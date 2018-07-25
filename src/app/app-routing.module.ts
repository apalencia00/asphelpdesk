import { NgModule } 						from '@angular/core';
import { CommonModule } 					from '@angular/common';  
import { RouterModule, Routes } 			from '@angular/router'; 
import { BienvenidoComponent } 				from './component/bienvenido/bienvenido.component';
import { DashboardComponent } 				from './component/dashboard/dashboard.component';
import { SolicitudComponent } 				from './component/solicitud/solicitud.component';
import { IncidenteComponent } 				from './component/solicitud/incidente/incidente.component'; 
import { HistorialComponent } 		        from './component/solicitud/historial/historial.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio'   ,    			component :  BienvenidoComponent }, 
  { path: 'home'     ,    			component :  DashboardComponent },
  { path: 'peticion' ,    			component :  SolicitudComponent },
  { path: 'incidente',    			component :  IncidenteComponent },
  { path: 'historial_incidente',    component :  HistorialComponent } 
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
