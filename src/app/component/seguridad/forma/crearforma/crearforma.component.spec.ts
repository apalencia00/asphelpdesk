import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearformaComponent } from './crearforma.component';

describe('CrearformaComponent', () => {
  let component: CrearformaComponent;
  let fixture: ComponentFixture<CrearformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
