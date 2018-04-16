import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibValidityStatusComponent } from './mobib-validity-status.component';

describe('MobibValidityStatusComponent', () => {
  let component: MobibValidityStatusComponent;
  let fixture: ComponentFixture<MobibValidityStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibValidityStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibValidityStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
