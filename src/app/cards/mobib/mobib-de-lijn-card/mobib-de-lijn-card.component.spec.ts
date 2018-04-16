import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibDeLijnCardComponent } from './mobib-de-lijn-card.component';

describe('MobibDeLijnCardComponent', () => {
  let component: MobibDeLijnCardComponent;
  let fixture: ComponentFixture<MobibDeLijnCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibDeLijnCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibDeLijnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
