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
  	 //console.log("aaa"+localStorage.getItem("token"));
     var id = Number(localStorage.getItem("token"));
     //console.log(id); 
    let timer = Observable.timer(3000,1000);
    timer.subscribe(t=> this.loadPage());

  }

    loadPage(){
    this.loading = false;
  }									

}
