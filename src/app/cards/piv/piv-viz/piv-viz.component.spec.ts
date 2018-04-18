import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivVizComponent } from './piv-viz.component';

describe('PivVizComponent', () => {
  let component: PivVizComponent;
  let fixture: ComponentFixture<PivVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
