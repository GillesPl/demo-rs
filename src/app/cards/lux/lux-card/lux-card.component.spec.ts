import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxCardComponent } from './lux-card.component';

describe('LuxCardComponent', () => {
  let component: LuxCardComponent;
  let fixture: ComponentFixture<LuxCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
