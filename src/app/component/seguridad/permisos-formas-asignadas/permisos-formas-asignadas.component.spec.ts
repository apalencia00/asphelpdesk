import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosFormasAsignadasComponent } from './permisos-formas-asignadas.component';

describe('PermisosFormasAsignadasComponent', () => {
  let component: PermisosFormasAsignadasComponent;
  let fixture: ComponentFixture<PermisosFormasAsignadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosFormasAsignadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosFormasAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
