import { TestBed } from '@angular/core/testing';

import { BCardServicesService } from './bcard-services.service';

describe('BCardServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BCardServicesService = TestBed.get(BCardServicesService);
    expect(service).toBeTruthy();
  });
});
