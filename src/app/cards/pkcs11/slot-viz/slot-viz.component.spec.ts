import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotVizComponent } from './slot-viz.component';

describe('SlotVizComponent', () => {
  let component: SlotVizComponent;
  let fixture: ComponentFixture<SlotVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
