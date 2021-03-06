import { BrowserModule }                      from    '@angular/platform-browser';
import { NgModule, InjectionToken }                           from    '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }                   from    '@angular/common/http'; 
import { BrowserAnimationsModule }            from    '@angular/platform-browser/animations';
/*import { NgxChartsModule }                    from    '@swimlane/ngx-charts';*/
import { AppComponent }                       from    './app.component';
import { BienvenidoComponent }                from    './component/bienvenido/bienvenido.component';
import { DashboardComponent }                 from    './component/dashboard/dashboard.component';
import { SolicitudComponent }                 from    './component/solicitud/solicitud.component';
import { IncidenteComponent,DialogOverviewExampleDialog,DialogInfo }                 from    './component/solicitud/incidente/incidente.component'; 
import { ResumenComponent }                   from    './component/solicitud/resumen/resumen.component'; 
import { HistorialComponent }                 from    './component/solicitud/historial/historial.component';
import { PerfilOpcionService }                from    './service/perfil-opcion.service';
import { AppRoutingModule }                   from    './app-routing.module';
import { LoadingModule,ANIMATION_TYPES }      from    'ngx-loading';
import { NgbModule }                          from    '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { MatMenuModule,
         MatButtonModule, 
         MatCheckboxModule, 
         MatSidenavModule,
         MatToolbarModule,
         MatIconModule,
         MatListModule,
         MatCardModule,
         MatInputModule,
         MatRippleModule,
         MatOptionModule,
         MatSelectModule,
         MatGridListModule,
         MatNativeDateModule,
         MatRadioModule,
         MatTableModule,
         MatPaginatorModule,
         MatDividerModule,
         MatChipsModule,
         MatBadgeModule,
         MatExpansionModule,
         MatTabsModule,
         MatFormFieldModule,
         MatSortModule,
         MatDialogModule,
         MatSnackBarModule,
         MatTooltipModule,MatProgressBarModule,MatProgressSpinnerModule
         }                                    from    '@angular/material';

import                                                  'hammerjs';
import { FormsModule,ReactiveFormsModule  }   from      '@angular/forms';
import { ChartModule }                        from      'angular-highcharts';
import {MatStepperModule}                     from      '@angular/material/stepper';
import { MatDatepickerModule }                from      '@angular/material/datepicker';
import { ConfigurarComponent }                from './component/solicitud/configurar/configurar.component';
import { AuditarincidenciaComponent, DialogAsignarServicio }         from './component/solicitud/auditarincidencia/auditarincidencia.component';
import { HistorialsolicitudComponent }        from './component/solicitud/configurar/historialsolicitud/historialsolicitud.component';
import { SeguridadComponent } from './component/seguridad/seguridad.component';
import { UsuariosComponent } from './component/seguridad/usuarios/usuarios.component';
import { GruposComponent } from './component/seguridad/grupos/grupos.component';
import { FormaComponent } from './component/seguridad/forma/forma.component';
import { PermisosFormasAsignadasComponent } from './component/seguridad/permisos-formas-asignadas/permisos-formas-asignadas.component';

import { CrearusuarioComponent, DialogUserCreado } from './component/seguridad/usuarios/crearusuario/crearusuario.component';
import { CrearformaComponent} from './component/seguridad/forma/crearforma/crearforma.component';

import { PusherService } from './service/pusher.service';
import { ServicioasignadoComponent } from './component/solicitud/servicioasignado/servicioasignado.component';
import { DetalleservicioasignadoComponent } from './component/solicitud/servicioasignado/detalleservicioasignado/detalleservicioasignado.component';
import { DialogoverviewComponent } from './component/dialogoverview/dialogoverview.component';
import { DetallemisolicitudComponent } from './component/detallemisolicitud/detallemisolicitud.component'
import { QRCodeModule } from 'angularx-qrcode';
import { PuntoventaComponent } from './component/solicitud/puntoventa/puntoventa.component';
import { ServicioseguridadComponent } from './component/servicioseguridad/servicioseguridad.component';
import { DetalleservicioseguridadComponent } from './component/servicioseguridad/detalleservicioseguridad/detalleservicioseguridad.component';
import { DialogloginComponent } from './dialoglogin/dialoglogin.component';
import { EditarUsuarioComponent} from './editar-usuario/editar-usuario.component';
import { CrearsubmenuComponent } from './component/seguridad/forma/crearsubmenu/crearsubmenu.component';
import { AsignarmenuComponent, DialogAsignarMenu } from './component/seguridad/forma/asignarmenu/asignarmenu.component';
import { RouterModule } from '@angular/router';
import { CierreservicioComponent } from './component/solicitud/cierreservicio/cierreservicio.component';
import { ProfileviewComponent } from './component/profileview/profileview.component';
import { ErrorComponent } from './component/error/error.component';
import { RegistrotecnicoComponent } from './component/solicitud/registrotecnico/registrotecnico.component';
import { ServiciosolicitudComponent } from './component/seguridad/serviciosolicitud/serviciosolicitud.component';
import { IndexusuarioComponent } from './component/indexusuario/indexusuario.component';
import { environment } from 'src/environments/environment';
import { MissolicitudesComponent } from './component/solicitud/missolicitudes/missolicitudes.component';
import { AccesomisolicitudesComponent } from './component/solicitud/missolicitudes/accesomisolicitudes/accesomisolicitudes.component';
import { MenususuarioComponent } from './component/seguridad/forma/menususuario/menususuario.component';
import { from } from 'rxjs';
import { ReportesComponent } from './reportes/reportes.component';
import { HttpErrorInterceptor } from './service/http-error.interceptor';
import { AuthGuard } from './auth.guard';



@NgModule({

entryComponents: [CrearusuarioComponent,CrearformaComponent,DialogoverviewComponent,DialogOverviewExampleDialog,DialogInfo,CrearsubmenuComponent,AsignarmenuComponent,DialogUserCreado, CierreservicioComponent, ProfileviewComponent, DialogAsignarMenu, DialogAsignarServicio],

  declarations: [
    AppComponent,
    BienvenidoComponent,
    DashboardComponent,
    SolicitudComponent,
    IncidenteComponent,
    DialogOverviewExampleDialog,
    ResumenComponent,
    HistorialComponent,
    ConfigurarComponent,
    AuditarincidenciaComponent,
    HistorialsolicitudComponent,
    SeguridadComponent,
    UsuariosComponent,
    GruposComponent,
    FormaComponent,
    PermisosFormasAsignadasComponent,
    CrearusuarioComponent,
    CrearformaComponent,
    ServicioasignadoComponent,
    DetalleservicioasignadoComponent,
    DialogoverviewComponent,
    DialogInfo ,
    DetallemisolicitudComponent,
    PuntoventaComponent, 
    ServicioseguridadComponent, 
    DetalleservicioseguridadComponent, 
    DialogloginComponent,
    EditarUsuarioComponent, 
    CrearsubmenuComponent, 
    AsignarmenuComponent,
    DialogUserCreado,
    CierreservicioComponent,
    ProfileviewComponent,
    ErrorComponent,
    RegistrotecnicoComponent, 
    DialogAsignarMenu, ServiciosolicitudComponent,  IndexusuarioComponent, DialogAsignarServicio, MissolicitudesComponent, AccesomisolicitudesComponent, MenususuarioComponent, ReportesComponent
    

  ],
  imports: [
    QRCodeModule,
    BrowserModule,
    MatMenuModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    HttpModule,
    HttpClientModule,
    ChartModule,
    MatStepperModule,
    NgbModule,
    MatSnackBarModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSortModule,
    MatTooltipModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '12px',
        primaryColour: '#6200EE', 
        secondaryColour: '#FF0266', 
        tertiaryColour: '#FFFFFF'
    }),

    RouterModule

  ],
  exports: [
    MatMenuModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatChipsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSortModule,
    MatTooltipModule
    
    ],


  providers: [AuthGuard,PerfilOpcionService,MatDatepickerModule,PusherService,DialogOverviewExampleDialog,UsuariosComponent, DialogAsignarMenu,
    ,{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
