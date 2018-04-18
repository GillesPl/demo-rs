import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVisualizerComponent } from './card-visualizer.component';

describe('CardVisualizerComponent', () => {
  let component: CardVisualizerComponent;
  let fixture: ComponentFixture<CardVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
