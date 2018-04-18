import { TestBed, inject } from '@angular/core/testing';

import { Connector } from './connector.service';

describe('ConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Connector]
    });
  });

  it('should be created', inject([Connector], (service: Connector) => {
    expect(service).toBeTruthy();
  }));
});
