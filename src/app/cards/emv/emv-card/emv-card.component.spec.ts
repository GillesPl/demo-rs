import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmvCardComponent } from './emv-card.component';

describe('EmvCardComponent', () => {
  let component: EmvCardComponent;
  let fixture: ComponentFixture<EmvCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmvCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
