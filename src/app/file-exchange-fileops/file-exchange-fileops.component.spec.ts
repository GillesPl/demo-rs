import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileExchangeFileopsComponent} from './file-exchange-fileops.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeFileopsComponent;
  let fixture: ComponentFixture<FileExchangeFileopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExchangeFileopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeFileopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
