import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPollingComponent } from './card-polling.component';

describe('CardPollingComponent', () => {
  let component: CardPollingComponent;
  let fixture: ComponentFixture<CardPollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
