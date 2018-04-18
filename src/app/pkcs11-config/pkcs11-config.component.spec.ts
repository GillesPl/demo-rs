import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pkcs11ConfigComponent } from './pkcs11-config.component';

describe('Pkcs11ConfigComponent', () => {
  let component: Pkcs11ConfigComponent;
  let fixture: ComponentFixture<Pkcs11ConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pkcs11ConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pkcs11ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
