import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcraVizComponent } from './ocra-viz.component';

describe('OcraVizComponent', () => {
  let component: OcraVizComponent;
  let fixture: ComponentFixture<OcraVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcraVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcraVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
