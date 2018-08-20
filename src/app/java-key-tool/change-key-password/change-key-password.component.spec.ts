import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ChangeKeyPasswordComponent} from './change-key-password.component';

describe('FileExchangeComponent', () => {
  let component: ChangeKeyPasswordComponent;
  let fixture: ComponentFixture<ChangeKeyPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeKeyPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeKeyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
