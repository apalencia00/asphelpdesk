import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexusuarioComponent } from './indexusuario.component';

describe('IndexusuarioComponent', () => {
  let component: IndexusuarioComponent;
  let fixture: ComponentFixture<IndexusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
