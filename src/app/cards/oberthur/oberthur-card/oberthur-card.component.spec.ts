import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OberthurCardComponent } from './oberthur-card.component';

describe('OberthurCardComponent', () => {
  let component: OberthurCardComponent;
  let fixture: ComponentFixture<OberthurCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OberthurCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OberthurCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
