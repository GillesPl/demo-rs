import { TestBed, inject } from '@angular/core/testing';

import { PteidService } from './pteid.service';

describe('PteidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PteidService]
    });
  });

  it('should be created', inject([PteidService], (service: PteidService) => {
    expect(service).toBeTruthy();
  }));
});
