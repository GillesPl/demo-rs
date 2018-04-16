import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibTecCardComponent } from './mobib-tec-card.component';

describe('MobibTecCardComponent', () => {
  let component: MobibTecCardComponent;
  let fixture: ComponentFixture<MobibTecCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibTecCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibTecCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
