import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyInfoComponent } from './dependency-info.component';

describe('DependencyInfoComponent', () => {
  let component: DependencyInfoComponent;
  let fixture: ComponentFixture<DependencyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
