import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgKeyComponent } from './ng-key.component';

describe('NgKeyModularComponent', () => {
  let component: NgKeyComponent;
  let fixture: ComponentFixture<NgKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
