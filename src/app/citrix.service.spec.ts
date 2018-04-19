import { TestBed, inject } from '@angular/core/testing';

import { CitrixService } from './citrix.service';

describe('CitrixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitrixService]
    });
  });

  it('should be created', inject([CitrixService], (service: CitrixService) => {
    expect(service).toBeTruthy();
  }));
});
