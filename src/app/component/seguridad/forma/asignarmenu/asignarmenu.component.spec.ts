import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarmenuComponent } from './asignarmenu.component';

describe('AsignarmenuComponent', () => {
  let component: AsignarmenuComponent;
  let fixture: ComponentFixture<AsignarmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
