import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apphelpu',
  templateUrl: './apphelpu.component.html',
  styleUrls: ['./apphelpu.component.css']
})
export class ApphelpuComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {

    this.router.navigate(['/login']);

  }

}
