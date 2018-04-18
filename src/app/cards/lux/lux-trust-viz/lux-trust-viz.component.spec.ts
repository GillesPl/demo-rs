import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxTrustVizComponent } from './lux-trust-viz.component';

describe('LuxTrustVizComponent', () => {
  let component: LuxTrustVizComponent;
  let fixture: ComponentFixture<LuxTrustVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxTrustVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxTrustVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
