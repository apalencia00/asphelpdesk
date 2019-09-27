import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrotecnicoComponent } from './registrotecnico.component';

describe('RegistrotecnicoComponent', () => {
  let component: RegistrotecnicoComponent;
  let fixture: ComponentFixture<RegistrotecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrotecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrotecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
