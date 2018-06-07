import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileExchangeMiscComponent} from './file-exchange-misc.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeMiscComponent;
  let fixture: ComponentFixture<FileExchangeMiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExchangeMiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
