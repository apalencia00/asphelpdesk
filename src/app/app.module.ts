import { BrowserModule }                      from    '@angular/platform-browser';
import { NgModule }                           from    '@angular/core';
import { HttpClientModule }                   from    '@angular/common/http'; 
import { BrowserAnimationsModule }            from    '@angular/platform-browser/animations';
/*import { NgxChartsModule }                    from    '@swimlane/ngx-charts';*/
import { AppComponent }                       from    './app.component';
import { BienvenidoComponent }                from    './component/bienvenido/bienvenido.component';
import { DashboardComponent }                 from    './component/dashboard/dashboard.component';
import { SolicitudComponent }                 from    './component/solicitud/solicitud.component';
import { IncidenteComponent }                 from    './component/solicitud/incidente/incidente.component'; 
import { ResumenComponent }                   from    './component/solicitud/resumen/resumen.component'; 
import { HistorialComponent }                 from    './component/solicitud/historial/historial.component';
import { PerfilOpcionService }                from    './service/perfil-opcion.service';
import { AppRoutingModule }                   from    './app-routing.module';
import { LoadingModule,ANIMATION_TYPES }      from    'ngx-loading';
import { NgbModule }                          from    '@ng-bootstrap/ng-bootstrap';

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
         MatTooltipModule
         }                                    from    '@angular/material';

import                                                  'hammerjs';
import { FormsModule,ReactiveFormsModule  }   from      '@angular/forms';
import { ChartModule }                        from      'angular-highcharts';
import {MatStepperModule}                     from      '@angular/material/stepper';
import { MatDatepickerModule }                from      '@angular/material/datepicker';
import { ConfigurarComponent }                from './component/solicitud/configurar/configurar.component';
import { AuditarincidenciaComponent }         from './component/solicitud/auditarincidencia/auditarincidencia.component';
import { HistorialsolicitudComponent }        from './component/solicitud/configurar/historialsolicitud/historialsolicitud.component';
import { SeguridadComponent } from './component/seguridad/seguridad.component';
import { UsuariosComponent } from './component/seguridad/usuarios/usuarios.component';
import { GruposComponent } from './component/seguridad/grupos/grupos.component';
import { FormaComponent } from './component/seguridad/forma/forma.component';
import { PermisosFormasAsignadasComponent } from './component/seguridad/permisos-formas-asignadas/permisos-formas-asignadas.component';
import { LoginComponent } from './component/login/login.component';


@NgModule({

entryComponents: [ LoginComponent ],

  declarations: [
    AppComponent,
    BienvenidoComponent,
    DashboardComponent,
    SolicitudComponent,
    IncidenteComponent,
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    MatStepperModule,
    NgbModule,
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
    })
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
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
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
    MatSortModule,
    MatTooltipModule
    
    ],

    

  providers: [PerfilOpcionService,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
