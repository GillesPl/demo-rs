import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCheckModalComponent } from './pin-check-modal.component';

describe('PinCheckModalComponent', () => {
  let component: PinCheckModalComponent;
  let fixture: ComponentFixture<PinCheckModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCheckModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCheckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
