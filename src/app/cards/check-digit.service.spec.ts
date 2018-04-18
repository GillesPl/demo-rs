import { TestBed, inject } from '@angular/core/testing';

import { CheckDigitService } from './check-digit.service';

describe('CheckDigitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckDigitService]
    });
  });

  it('should be created', inject([CheckDigitService], (service: CheckDigitService) => {
    expect(service).toBeTruthy();
  }));
});
