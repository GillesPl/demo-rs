import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitrixUserSelectModalComponent } from './citrix-user-select-modal.component';

describe('CitrixUserSelectModalComponent', () => {
  let component: CitrixUserSelectModalComponent;
  let fixture: ComponentFixture<CitrixUserSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitrixUserSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitrixUserSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
