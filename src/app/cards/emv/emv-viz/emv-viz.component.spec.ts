import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmvVizComponent } from './emv-viz.component';

describe('EmvVizComponent', () => {
  let component: EmvVizComponent;
  let fixture: ComponentFixture<EmvVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmvVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmvVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
