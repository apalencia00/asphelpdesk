import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cierreservicio',
  templateUrl: './cierreservicio.component.html',
  styleUrls: ['./cierreservicio.component.css']
})

export class CierreservicioComponent implements OnInit {
  step = 0;



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;

    if ( this.step == 1 ) {

      console.log("este es el final");

    }

  }

  prevStep() {
    this.step--;
  }


  constructor() { }

  ngOnInit() {
  }

}
