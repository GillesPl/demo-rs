import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcDownloadFailedComponent } from './rmc-download-failed.component';

describe('RmcDownloadFailedComponent', () => {
  let component: RmcDownloadFailedComponent;
  let fixture: ComponentFixture<RmcDownloadFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcDownloadFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcDownloadFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
