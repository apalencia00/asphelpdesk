import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApphelpuComponent } from './apphelpu.component';

describe('ApphelpuComponent', () => {
  let component: ApphelpuComponent;
  let fixture: ComponentFixture<ApphelpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApphelpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApphelpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
