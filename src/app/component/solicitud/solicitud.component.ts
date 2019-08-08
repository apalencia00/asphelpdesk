import { Component, OnInit, ViewChild}                   from '@angular/core';
import { Observable }                         from 'rxjs/Rx';
import { MatMenuModule }                      from '@angular/material/menu';
import { PerfilOpcionService }                from '../../service/perfil-opcion.service';


@Component({
  selector    : 'app-solicitud',
  template : `<div class="example-container" >
  <mat-toolbar color="primary" class="example-toolbar">
  <button mat-icon-button (click)="snav.toggle()">
  <mat-icon>menu</mat-icon>
  </button>
  
  <h1 class="example-app-name">HelpDesk - AspSoluciones</h1>
  <span class="example-spacer"></span>
  
  <button mat-icon-button [matMenuTriggerFor]="menu"
  matBadge="8" matBadgePosition="above after" matBadgeColor="warn">
  <mat-icon>account_circle</mat-icon>
  </button>
  
  <mat-menu #menu="matMenu">
  <button mat-menu-item>
  <mat-icon>dialpad</mat-icon>
  <span>Redial</span>
  </button>
  <button mat-menu-item disabled>
  <mat-icon>voicemail</mat-icon>
  <span>Check voicemail</span>
  </button>
  <button mat-menu-item>
  <mat-icon>notifications_off</mat-icon>
  <span>Disable alerts</span>
  </button>
  </mat-menu>
  
  <button mat-icon-button routerLink="../home" >
  <mat-icon>home</mat-icon>
  
  </button>
  
  <button mat-icon-button routerLink="../home" >
  <mat-icon>account_circle</mat-icon>
  
  </button>
  </mat-toolbar>
  
  <mat-sidenav-container autosize class="example-sidenav-container"
  >
  <mat-sidenav #snav mode="side" opened role="region" >
  <a routerLink="dashboard">
  <button  mat-menu-item ><mat-icon> home </mat-icon>DashBoard
  
  </button>
  
  </a>
  
  <mat-nav-list *ngFor="let nav of perfil_heldesk">
  
  <button  mat-menu-item [matMenuTriggerFor]="menus" (click)="clickHandlerSubMenu(idus,nav.id)" >
  <mat-icon> {{nav.icono}} </mat-icon>{{nav.descripcion}}
  
  </button>
  
  <mat-menu #menus="matMenu">
  <mat-nav-list *ngFor="let op of perfil_sbheldesk">
  <a [routerLink]="[op.acceso]" >
  <button   mat-menu-item ><mat-icon> {{op.icono}} 
  </mat-icon>{{op.descripcion_sbmenu}}
  </button>
  </a>
  </mat-nav-list>
  
  </mat-menu>
  
  
  
  </mat-nav-list>
  </mat-sidenav>
  
  <mat-sidenav-content style="padding-left: 50px; padding-right: 50px; flex: 1  ">
  
  <router-outlet ></router-outlet>
  
  </mat-sidenav-content>
  
  
  
  </mat-sidenav-container>
  
  
  </div>
  
  
  `,
  styleUrls   : ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  
	show:  boolean = false;
	showh: boolean = false;
  perfil_heldesk;
  perfil_sbheldesk;
  
  validapermiso = true;
  
	public loading = true;
  
  constructor( private opcion : PerfilOpcionService ) { }
  
  ngOnInit() {
    //console.log("aaa"+localStorage.getItem("token"));
    var id = Number(localStorage.getItem("token"));
    //console.log(id);
    this.opcion.getOpcionesServicio(id).subscribe(p=>this.perfil_heldesk = p);
    
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());
    
  }
  
  clickHandlerSubMenu(idus : number,idmenu) {
    var id = Number(localStorage.getItem("token"));
    this.opcion.getSubOpcionesServicio(id,idmenu).subscribe(a=>this.perfil_sbheldesk = a);
    
  }
  
  loadPage(){
    this.loading = false;
  }
  
  getViewContexto(id : string){
    
    
    
  }
  
}
