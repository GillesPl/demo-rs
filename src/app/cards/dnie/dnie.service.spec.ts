import { TestBed, inject } from '@angular/core/testing';

import { DnieService } from './dnie.service';

describe('DnieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DnieService]
    });
  });

  it('should be created', inject([DnieService], (service: DnieService) => {
    expect(service).toBeTruthy();
  }));
});
