import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCheckWithCanModalComponent } from './pin-check-with-can-modal.component';

describe('PinCheckWithCanModalComponent', () => {
  let component: PinCheckWithCanModalComponent;
  let fixture: ComponentFixture<PinCheckWithCanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCheckWithCanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCheckWithCanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
