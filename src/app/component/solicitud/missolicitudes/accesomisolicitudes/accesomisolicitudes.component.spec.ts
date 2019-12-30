import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesomisolicitudesComponent } from './accesomisolicitudes.component';

describe('AccesomisolicitudesComponent', () => {
  let component: AccesomisolicitudesComponent;
  let fixture: ComponentFixture<AccesomisolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesomisolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesomisolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
