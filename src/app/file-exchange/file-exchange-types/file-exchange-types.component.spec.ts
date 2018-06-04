import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FileExchangeTypesComponent} from './file-exchange-types.component';

describe('FileExchangeComponent', () => {
  let component: FileExchangeTypesComponent;
  let fixture: ComponentFixture<FileExchangeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExchangeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExchangeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
