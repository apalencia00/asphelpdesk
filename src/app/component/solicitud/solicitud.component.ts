import { Component, OnInit}                   from '@angular/core';
import { Observable }                         from 'rxjs/Rx';
import { MatMenuModule }                      from '@angular/material/menu';
import { PerfilOpcionService }                from '../../service/perfil-opcion.service';


@Component({
  selector    : 'app-solicitud',
  template : `<div class="example-container" >
  <mat-toolbar color="primary" class="example-toolbar">
    <button mat-icon-button (click)="snav.toggle()">
      <mat-icon>menu</mat-icon></button>
      <h1 class="example-app-name">HelpDesk - AspSoluciones</h1>
      <span class="example-spacer"></span>
       <button mat-icon-button routerLink="../home" >
      <mat-icon>home</mat-icon></button>
    </mat-toolbar>

    <mat-sidenav-container autosize class="example-sidenav-container"
    >
    <mat-sidenav #snav mode="side" opened role="region" >
    <a routerLink="dashboard">
      <button  mat-menu-item ><mat-icon> home </mat-icon>DashBoard
  
        </button>

        </a>

      <mat-nav-list *ngFor="let nav of perfil_heldesk">

        <button  mat-menu-item [matMenuTriggerFor]="menus" (click)="clickHandlerSubMenu(nav.id)" >
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
    this.opcion.getOpcionesServicio().subscribe(p=>this.perfil_heldesk = p);
    
  	let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());

  }

  clickHandlerSubMenu(id : number) {

    this.opcion.getSubOpcionesServicio(id).subscribe(a=>this.perfil_sbheldesk = a);

  }

  loadPage(){
  	this.loading = false;
  }

  getViewContexto(id : string){



  }

}