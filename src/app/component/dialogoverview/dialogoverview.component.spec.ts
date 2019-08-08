import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoverviewComponent } from './dialogoverview.component';

describe('DialogoverviewComponent', () => {
  let component: DialogoverviewComponent;
  let fixture: ComponentFixture<DialogoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
