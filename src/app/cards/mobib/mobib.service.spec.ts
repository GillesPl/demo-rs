import { TestBed, inject } from '@angular/core/testing';

import { MobibService } from './mobib.service';

describe('MobibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MobibService]
    });
  });

  it('should be created', inject([MobibService], (service: MobibService) => {
    expect(service).toBeTruthy();
  }));
});
