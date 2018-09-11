import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaComponent } from './forma.component';

describe('FormaComponent', () => {
  let component: FormaComponent;
  let fixture: ComponentFixture<FormaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
