import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OberthurVizComponent } from './oberthur-viz.component';

describe('OberthurVizComponent', () => {
  let component: OberthurVizComponent;
  let fixture: ComponentFixture<OberthurVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OberthurVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OberthurVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
