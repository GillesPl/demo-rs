import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileExchangeDownloadComponent} from './file-exchange-download.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeDownloadComponent;
  let fixture: ComponentFixture<FileExchangeDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExchangeDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
