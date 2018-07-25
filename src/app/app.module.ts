import { BrowserModule }                      from    '@angular/platform-browser';
import { NgModule }                           from    '@angular/core';
import { HttpClientModule }                   from    '@angular/common/http'; 
import { BrowserAnimationsModule }            from    '@angular/platform-browser/animations';
/*import { NgxChartsModule }                    from    '@swimlane/ngx-charts';*/
import { AppComponent }                       from    './app.component';
import { BienvenidoComponent }                from    './component/bienvenido/bienvenido.component';
import { DashboardComponent }                 from    './component/dashboard/dashboard.component';
import { SolicitudComponent }                 from    './component/solicitud/solicitud.component';
import { PerfilOpcionService }                from    './service/perfil-opcion.service';
import { AppRoutingModule }                   from    './/app-routing.module';
import { LoadingModule,ANIMATION_TYPES }      from    'ngx-loading';
import { NgbModule }                          from    '@ng-bootstrap/ng-bootstrap';
import { IncidenteComponent }                 from    './component/solicitud/incidente/incidente.component';
import { HistorialComponent }                 from    './component/solicitud/historial/historial.component';
import { ResumenComponent }                   from    './component/solicitud/resumen/resumen.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    DashboardComponent,
    SolicitudComponent,
    IncidenteComponent,
    HistorialComponent,
    ResumenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '12px',
        primaryColour: '#6200EE', 
        secondaryColour: '#FF0266', 
        tertiaryColour: '#FFFFFF'
    })
  ],
  providers: [PerfilOpcionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
