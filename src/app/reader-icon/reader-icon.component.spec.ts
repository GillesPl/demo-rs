import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderIconComponent } from './reader-icon.component';

describe('ReaderIconComponent', () => {
  let component: ReaderIconComponent;
  let fixture: ComponentFixture<ReaderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
