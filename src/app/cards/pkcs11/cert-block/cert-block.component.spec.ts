import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertBlockComponent } from './cert-block.component';

describe('CertBlockComponent', () => {
  let component: CertBlockComponent;
  let fixture: ComponentFixture<CertBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
