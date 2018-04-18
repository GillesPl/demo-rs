import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxPinCheckStatusComponent } from './lux-pin-check-status.component';

describe('LuxPinCheckStatusComponent', () => {
  let component: LuxPinCheckStatusComponent;
  let fixture: ComponentFixture<LuxPinCheckStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxPinCheckStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxPinCheckStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
