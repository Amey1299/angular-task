import { TestBed } from '@angular/core/testing';

import { Api.UpdateProfileService } from './api.update-profile.service';

describe('Api.UpdateProfileService', () => {
  let service: Api.UpdateProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api.UpdateProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
