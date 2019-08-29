import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asignarmenu',
  templateUrl: './asignarmenu.component.html',
  styleUrls: ['./asignarmenu.component.css']
})
export class AsignarmenuComponent implements OnInit {
  
  firstFormGroup: FormGroup;
secondFormGroup : FormGroup;
  public loading = false;
  step = 0;
  constructor() { }

  ngOnInit() {



  }


  setStep(index: number) {
    this.step = index;
  }
  
  nextStep() {
    this.step++;
  }
  
  prevStep() {
    this.step--;
  }
}
