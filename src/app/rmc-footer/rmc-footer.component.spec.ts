import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcFooterComponent } from './rmc-footer.component';

describe('RmcFooterComponent', () => {
  let component: RmcFooterComponent;
  let fixture: ComponentFixture<RmcFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
