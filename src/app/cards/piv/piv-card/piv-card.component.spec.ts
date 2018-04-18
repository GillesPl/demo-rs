import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivCardComponent } from './piv-card.component';

describe('PivCardComponent', () => {
  let component: PivCardComponent;
  let fixture: ComponentFixture<PivCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
