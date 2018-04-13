import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcraCardComponent } from './ocra-card.component';

describe('OcraCardComponent', () => {
  let component: OcraCardComponent;
  let fixture: ComponentFixture<OcraCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcraCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
