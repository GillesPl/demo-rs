import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcKeypadComponent } from './rmc-keypad.component';

describe('RmcKeypadComponent', () => {
  let component: RmcKeypadComponent;
  let fixture: ComponentFixture<RmcKeypadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcKeypadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcKeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
