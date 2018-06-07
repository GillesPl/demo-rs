import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileExchangeTypeopsComponent} from './file-exchange-typeops.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeTypeopsComponent;
  let fixture: ComponentFixture<FileExchangeTypeopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExchangeTypeopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeTypeopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
