import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcConsentComponent } from './rmc-consent.component';

describe('RmcConsentComponent', () => {
  let component: RmcConsentComponent;
  let fixture: ComponentFixture<RmcConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
