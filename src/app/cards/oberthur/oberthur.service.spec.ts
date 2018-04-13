import { TestBed, inject } from '@angular/core/testing';

import { OberthurService } from './oberthur.service';

describe('OberthurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OberthurService]
    });
  });

  it('should be created', inject([OberthurService], (service: OberthurService) => {
    expect(service).toBeTruthy();
  }));
});
