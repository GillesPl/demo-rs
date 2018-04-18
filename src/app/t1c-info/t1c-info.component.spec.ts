import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T1cInfoComponent } from './t1c-info.component';

describe('T1cInfoComponent', () => {
  let component: T1cInfoComponent;
  let fixture: ComponentFixture<T1cInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T1cInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T1cInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
