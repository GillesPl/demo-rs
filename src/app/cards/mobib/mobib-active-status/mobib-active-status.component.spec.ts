import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibActiveStatusComponent } from './mobib-active-status.component';

describe('MobibActiveStatusComponent', () => {
  let component: MobibActiveStatusComponent;
  let fixture: ComponentFixture<MobibActiveStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibActiveStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibActiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
