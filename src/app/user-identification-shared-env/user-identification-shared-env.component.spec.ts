import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserIdentificationSharedEnvComponent} from './user-identification-shared-env.component';

describe('ConsentModalComponent', () => {
  let component: UserIdentificationSharedEnvComponent;
  let fixture: ComponentFixture<UserIdentificationSharedEnvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdentificationSharedEnvComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdentificationSharedEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
