import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ListEntriesComponent} from './list-entries.component';

describe('FileExchangeComponent', () => {
  let component: ListEntriesComponent;
  let fixture: ComponentFixture<ListEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
