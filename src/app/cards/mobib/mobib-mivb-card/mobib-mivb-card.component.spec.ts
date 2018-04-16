import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibMivbCardComponent } from './mobib-mivb-card.component';

describe('MobibMivbCardComponent', () => {
  let component: MobibMivbCardComponent;
  let fixture: ComponentFixture<MobibMivbCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibMivbCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibMivbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
