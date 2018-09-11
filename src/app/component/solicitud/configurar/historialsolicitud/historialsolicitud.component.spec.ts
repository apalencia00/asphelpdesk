import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialsolicitudComponent } from './historialsolicitud.component';

describe('HistorialsolicitudComponent', () => {
  let component: HistorialsolicitudComponent;
  let fixture: ComponentFixture<HistorialsolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialsolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialsolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
