import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteidAddressPinModalComponent } from './pteid-address-pin-modal.component';

describe('PteidAddressPinModalComponent', () => {
  let component: PteidAddressPinModalComponent;
  let fixture: ComponentFixture<PteidAddressPinModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteidAddressPinModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteidAddressPinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
