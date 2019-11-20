import { TestBed } from '@angular/core/testing';

import { BCardAuthServiceService } from './bcard-auth-service.service';

describe('BCardAuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BCardAuthServiceService = TestBed.get(BCardAuthServiceService);
    expect(service).toBeTruthy();
  });
});
