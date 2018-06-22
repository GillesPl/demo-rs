import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileExchangeFileViewComponent} from './file-exchange-file-view.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeFileViewComponent;
  let fixture: ComponentFixture<FileExchangeFileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExchangeFileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
