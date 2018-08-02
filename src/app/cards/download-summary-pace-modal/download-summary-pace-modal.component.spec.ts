import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSummaryPaceModalComponent } from './download-summary-pace-modal.component';

describe('DownloadSummaryPaceModalComponent', () => {
  let component: DownloadSummaryPaceModalComponent;
  let fixture: ComponentFixture<DownloadSummaryPaceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSummaryPaceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSummaryPaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
