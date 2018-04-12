import { TestBed, inject } from '@angular/core/testing';

import { BeidService } from './beid.service';

describe('BeidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeidService]
    });
  });

  it('should be created', inject([BeidService], (service: BeidService) => {
    expect(service).toBeTruthy();
  }));
});
