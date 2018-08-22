import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ExportCertificateComponent} from './export-certificate.component';

describe('FileExchangeComponent', () => {
  let component: ExportCertificateComponent;
  let fixture: ComponentFixture<ExportCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
