import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pkcs11VizComponent } from './pkcs11-viz.component';

describe('Pkcs11VizComponent', () => {
  let component: Pkcs11VizComponent;
  let fixture: ComponentFixture<Pkcs11VizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pkcs11VizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pkcs11VizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
