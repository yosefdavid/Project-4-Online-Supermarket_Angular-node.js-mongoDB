import { TestBed } from '@angular/core/testing';

import { LoginAndRegistrationService } from './login-and-registration.service';

describe('LoginAndRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAndRegistrationService = TestBed.get(LoginAndRegistrationService);
    expect(service).toBeTruthy();
  });
});
