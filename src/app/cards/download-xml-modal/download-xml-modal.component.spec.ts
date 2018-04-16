import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadXmlModalComponent } from './download-xml-modal.component';

describe('DownloadXmlModalComponent', () => {
  let component: DownloadXmlModalComponent;
  let fixture: ComponentFixture<DownloadXmlModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadXmlModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadXmlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
