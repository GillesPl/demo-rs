import { TestBed, inject } from '@angular/core/testing';

import { LuxTrustService } from './lux-trust.service';

describe('LuxTrustService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuxTrustService]
    });
  });

  it('should be created', inject([LuxTrustService], (service: LuxTrustService) => {
    expect(service).toBeTruthy();
  }));
});
