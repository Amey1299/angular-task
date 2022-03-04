import { TestBed } from '@angular/core/testing';

import { Api.LoginService } from './api.login.service';

describe('Api.LoginService', () => {
  let service: Api.LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api.LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
