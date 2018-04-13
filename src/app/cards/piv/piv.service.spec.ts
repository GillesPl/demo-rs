import { TestBed, inject } from '@angular/core/testing';

import { PivService } from './piv.service';

describe('PivService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PivService]
    });
  });

  it('should be created', inject([PivService], (service: PivService) => {
    expect(service).toBeTruthy();
  }));
});
