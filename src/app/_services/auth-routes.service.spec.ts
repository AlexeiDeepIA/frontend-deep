import { TestBed } from '@angular/core/testing';

import { AuthRoutesService } from './auth-routes.service';

describe('AuthRoutesService', () => {
  let service: AuthRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
