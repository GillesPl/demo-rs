import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteidCardComponent } from './pteid-card.component';

describe('PteidCardComponent', () => {
  let component: PteidCardComponent;
  let fixture: ComponentFixture<PteidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteidCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
