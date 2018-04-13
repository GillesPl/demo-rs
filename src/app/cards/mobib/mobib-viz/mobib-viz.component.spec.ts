import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibVizComponent } from './mobib-viz.component';

describe('MobibVizComponent', () => {
  let component: MobibVizComponent;
  let fixture: ComponentFixture<MobibVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
