import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderPollingComponent } from './reader-polling.component';

describe('ReaderPollingComponent', () => {
  let component: ReaderPollingComponent;
  let fixture: ComponentFixture<ReaderPollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderPollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
