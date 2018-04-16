import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSummaryModalComponent } from './download-summary-modal.component';

describe('DownloadSummaryModalComponent', () => {
  let component: DownloadSummaryModalComponent;
  let fixture: ComponentFixture<DownloadSummaryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSummaryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSummaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
