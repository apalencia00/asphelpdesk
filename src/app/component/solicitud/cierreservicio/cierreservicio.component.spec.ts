import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreservicioComponent } from './cierreservicio.component';

describe('CierreservicioComponent', () => {
  let component: CierreservicioComponent;
  let fixture: ComponentFixture<CierreservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
