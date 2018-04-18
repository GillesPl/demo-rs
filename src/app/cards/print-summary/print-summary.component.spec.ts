import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSummaryComponent } from './print-summary.component';

describe('PrintSummaryComponent', () => {
  let component: PrintSummaryComponent;
  let fixture: ComponentFixture<PrintSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
