import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteidAddressPinCheckStatusComponent } from './pteid-address-pin-check-status.component';

describe('PteidAddressPinCheckStatusComponent', () => {
  let component: PteidAddressPinCheckStatusComponent;
  let fixture: ComponentFixture<PteidAddressPinCheckStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteidAddressPinCheckStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteidAddressPinCheckStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
