import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeidVizComponent } from './beid-viz.component';

describe('BeidVizComponent', () => {
  let component: BeidVizComponent;
  let fixture: ComponentFixture<BeidVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeidVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeidVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
