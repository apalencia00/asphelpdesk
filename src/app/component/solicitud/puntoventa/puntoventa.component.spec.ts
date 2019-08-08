import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoventaComponent } from './puntoventa.component';

describe('PuntoventaComponent', () => {
  let component: PuntoventaComponent;
  let fixture: ComponentFixture<PuntoventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
