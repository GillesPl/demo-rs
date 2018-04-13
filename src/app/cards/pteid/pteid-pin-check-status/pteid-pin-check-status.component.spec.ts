import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteidPinCheckStatusComponent } from './pteid-pin-check-status.component';

describe('PteidPinCheckStatusComponent', () => {
  let component: PteidPinCheckStatusComponent;
  let fixture: ComponentFixture<PteidPinCheckStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteidPinCheckStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteidPinCheckStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
