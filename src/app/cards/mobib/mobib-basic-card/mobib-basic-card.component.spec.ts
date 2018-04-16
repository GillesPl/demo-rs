import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibBasicCardComponent } from './mobib-basic-card.component';

describe('MobibBasicCardComponent', () => {
  let component: MobibBasicCardComponent;
  let fixture: ComponentFixture<MobibBasicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibBasicCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibBasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
