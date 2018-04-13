import { TestBed, inject } from '@angular/core/testing';

import { LuxService } from './lux.service';

describe('LuxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuxService]
    });
  });

  it('should be created', inject([LuxService], (service: LuxService) => {
    expect(service).toBeTruthy();
  }));
});
