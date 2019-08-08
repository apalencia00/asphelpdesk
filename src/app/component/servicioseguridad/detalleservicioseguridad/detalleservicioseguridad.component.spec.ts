import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleservicioseguridadComponent } from './detalleservicioseguridad.component';

describe('DetalleservicioseguridadComponent', () => {
  let component: DetalleservicioseguridadComponent;
  let fixture: ComponentFixture<DetalleservicioseguridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleservicioseguridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleservicioseguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
