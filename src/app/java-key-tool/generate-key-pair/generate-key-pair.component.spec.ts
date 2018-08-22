import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileExchangeUploadComponent} from './generate-key-pair.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeUploadComponent;
  let fixture: ComponentFixture<FileExchangeUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExchangeUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
