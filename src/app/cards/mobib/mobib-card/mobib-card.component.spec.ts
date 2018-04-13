import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibCardComponent } from './mobib-card.component';

describe('MobibCardComponent', () => {
  let component: MobibCardComponent;
  let fixture: ComponentFixture<MobibCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
