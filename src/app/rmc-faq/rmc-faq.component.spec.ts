import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcFaqComponent } from './rmc-faq.component';

describe('RmcFaqComponent', () => {
  let component: RmcFaqComponent;
  let fixture: ComponentFixture<RmcFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
