import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenususuarioComponent } from './menususuario.component';

describe('MenususuarioComponent', () => {
  let component: MenususuarioComponent;
  let fixture: ComponentFixture<MenususuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenususuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenususuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
