import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-detallemisolicitud',
  templateUrl: './detallemisolicitud.component.html',
  styleUrls: ['./detallemisolicitud.component.css'] 
})
export class DetallemisolicitudComponent implements OnInit {

 step = 0;
 soypipe : String = "";


  constructor(private route: Router) { }

  ngOnInit() {
    var myhurl = this.route.url;
    var arrayDeCadenas = myhurl.split("/");
    this.soypipe = arrayDeCadenas[4];
  }


 

}
