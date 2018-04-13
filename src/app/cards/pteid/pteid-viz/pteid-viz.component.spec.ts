import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteidVizComponent } from './pteid-viz.component';

describe('PteidVizComponent', () => {
  let component: PteidVizComponent;
  let fixture: ComponentFixture<PteidVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteidVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteidVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
