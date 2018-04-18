import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnieVizComponent } from './dnie-viz.component';

describe('DnieVizComponent', () => {
  let component: DnieVizComponent;
  let fixture: ComponentFixture<DnieVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnieVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnieVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
