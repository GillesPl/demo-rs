import { TestBed, inject } from '@angular/core/testing';

import { EmvService } from './emv.service';

describe('EmvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmvService]
    });
  });

  it('should be created', inject([EmvService], (service: EmvService) => {
    expect(service).toBeTruthy();
  }));
});
