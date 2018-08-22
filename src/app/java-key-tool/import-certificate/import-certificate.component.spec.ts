import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ImportCertificateComponent} from './import-certificate.component';

describe('FileExchangeComponent', () => {
  let component: ImportCertificateComponent;
  let fixture: ComponentFixture<ImportCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
