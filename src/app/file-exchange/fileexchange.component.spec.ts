import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileexchangeComponent} from './fileexchange.component';

describe('FileExchangeComponent', () => {
  let component: FileexchangeComponent;
  let fixture: ComponentFixture<FileexchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileexchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
