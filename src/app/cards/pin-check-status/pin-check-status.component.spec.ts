import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCheckStatusComponent } from './pin-check-status.component';

describe('PinCheckStatusComponent', () => {
  let component: PinCheckStatusComponent;
  let fixture: ComponentFixture<PinCheckStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCheckStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCheckStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
