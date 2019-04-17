import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioasignadoComponent } from './servicioasignado.component';

describe('ServicioasignadoComponent', () => {
  let component: ServicioasignadoComponent;
  let fixture: ComponentFixture<ServicioasignadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioasignadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioasignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
