import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadGclComponent } from './download-gcl.component';

describe('DownloadGclComponent', () => {
  let component: DownloadGclComponent;
  let fixture: ComponentFixture<DownloadGclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadGclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadGclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
