import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgKeypadComponent } from './ng-keypad.component';

describe('NgKeypadComponent', () => {
  let component: NgKeypadComponent;
  let fixture: ComponentFixture<NgKeypadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgKeypadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgKeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
