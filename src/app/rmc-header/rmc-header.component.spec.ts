import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcHeaderComponent } from './rmc-header.component';

describe('RmcHeaderComponent', () => {
  let component: RmcHeaderComponent;
  let fixture: ComponentFixture<RmcHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
