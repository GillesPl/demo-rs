import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobibContractTableComponent } from './mobib-contract-table.component';

describe('MobibContractTableComponent', () => {
  let component: MobibContractTableComponent;
  let fixture: ComponentFixture<MobibContractTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobibContractTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobibContractTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
