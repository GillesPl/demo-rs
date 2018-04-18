import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxTrustCardComponent } from './lux-trust-card.component';

describe('LuxTrustCardComponent', () => {
  let component: LuxTrustCardComponent;
  let fixture: ComponentFixture<LuxTrustCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxTrustCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxTrustCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
