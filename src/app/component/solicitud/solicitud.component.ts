import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

	public isCollapsed = false;
	show:  boolean = false;
	showh: boolean = false;

	public loading = true;

  constructor() { }

  ngOnInit() {

  		let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());

  }

  loadPage(){
  	this.loading = false;
  }

}
