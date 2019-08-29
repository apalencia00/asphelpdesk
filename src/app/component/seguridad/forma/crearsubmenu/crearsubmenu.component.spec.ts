import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearsubmenuComponent } from './crearsubmenu.component';

describe('CrearsubmenuComponent', () => {
  let component: CrearsubmenuComponent;
  let fixture: ComponentFixture<CrearsubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearsubmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearsubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
