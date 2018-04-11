import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReaderInfoComponent } from './card-reader-info.component';

describe('CardReaderInfoComponent', () => {
  let component: CardReaderInfoComponent;
  let fixture: ComponentFixture<CardReaderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardReaderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
