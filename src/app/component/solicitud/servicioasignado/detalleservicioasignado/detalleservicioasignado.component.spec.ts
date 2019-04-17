import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleservicioasignadoComponent } from './detalleservicioasignado.component';

describe('DetalleservicioasignadoComponent', () => {
  let component: DetalleservicioasignadoComponent;
  let fixture: ComponentFixture<DetalleservicioasignadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleservicioasignadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleservicioasignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
