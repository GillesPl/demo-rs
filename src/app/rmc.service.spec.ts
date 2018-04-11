import { TestBed, inject } from '@angular/core/testing';

import { RmcService } from './rmc.service';

describe('RmcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RmcService]
    });
  });

  it('should be created', inject([RmcService], (service: RmcService) => {
    expect(service).toBeTruthy();
  }));
});
