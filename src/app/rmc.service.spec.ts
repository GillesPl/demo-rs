import { TestBed, inject } from '@angular/core/testing';

import { RMC } from './rmc.service';

describe('RmcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RMC]
    });
  });

  it('should be created', inject([RMC], (service: RMC) => {
    expect(service).toBeTruthy();
  }));
});
