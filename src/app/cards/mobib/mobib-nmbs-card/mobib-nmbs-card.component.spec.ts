import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibNmbsCardComponent } from './mobib-nmbs-card.component';

describe('MobibNmbsCardComponent', () => {
  let component: MobibNmbsCardComponent;
  let fixture: ComponentFixture<MobibNmbsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibNmbsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibNmbsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
