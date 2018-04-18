import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeidCardComponent } from './beid-card.component';

describe('BeidCardComponent', () => {
  let component: BeidCardComponent;
  let fixture: ComponentFixture<BeidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeidCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
