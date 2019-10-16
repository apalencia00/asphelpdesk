import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosolicitudComponent } from './serviciosolicitud.component';

describe('ServiciosolicitudComponent', () => {
  let component: ServiciosolicitudComponent;
  let fixture: ComponentFixture<ServiciosolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
