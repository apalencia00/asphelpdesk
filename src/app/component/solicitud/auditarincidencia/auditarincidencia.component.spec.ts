import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditarincidenciaComponent } from './auditarincidencia.component';

describe('AuditarincidenciaComponent', () => {
  let component: AuditarincidenciaComponent;
  let fixture: ComponentFixture<AuditarincidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditarincidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditarincidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
