import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxVizComponent } from './lux-viz.component';

describe('LuxVizComponent', () => {
  let component: LuxVizComponent;
  let fixture: ComponentFixture<LuxVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
