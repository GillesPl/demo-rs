import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadXmlCertificateidModalComponent } from './download-xml-certificateid-modal.component';

describe('DownloadXmlCertificateidModalComponent', () => {
  let component: DownloadXmlCertificateidModalComponent;
  let fixture: ComponentFixture<DownloadXmlCertificateidModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadXmlCertificateidModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadXmlCertificateidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
