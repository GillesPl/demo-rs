import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderSelectComponent } from './reader-select.component';

describe('ReaderSelectComponent', () => {
  let component: ReaderSelectComponent;
  let fixture: ComponentFixture<ReaderSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
