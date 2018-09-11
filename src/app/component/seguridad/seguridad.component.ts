import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {

	public loading = true;

  constructor( private route: ActivatedRoute ) { }

   ngOnInit() {
  	 
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());

  }

    loadPage(){
    this.loading = false;
  }									

}
