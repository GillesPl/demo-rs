import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnieCardComponent } from './dnie-card.component';

describe('DnieCardComponent', () => {
  let component: DnieCardComponent;
  let fixture: ComponentFixture<DnieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnieCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
