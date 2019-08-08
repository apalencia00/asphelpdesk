import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioseguridadComponent } from './servicioseguridad.component';

describe('ServicioseguridadComponent', () => {
  let component: ServicioseguridadComponent;
  let fixture: ComponentFixture<ServicioseguridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioseguridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioseguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
