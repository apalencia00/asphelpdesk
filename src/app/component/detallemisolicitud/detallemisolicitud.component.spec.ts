import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallemisolicitudComponent } from './detallemisolicitud.component';

describe('DetallemisolicitudComponent', () => {
  let component: DetallemisolicitudComponent;
  let fixture: ComponentFixture<DetallemisolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallemisolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallemisolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
