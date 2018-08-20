import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ChangeKeystorePasswordComponent} from './change-keystore-password.component';

describe('FileExchangeComponent', () => {
  let component: ChangeKeystorePasswordComponent;
  let fixture: ComponentFixture<ChangeKeystorePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeKeystorePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeKeystorePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
