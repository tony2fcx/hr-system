import { TestBed } from '@angular/core/testing';

import { MgProfileService } from './mg-profile-service';

describe('MgProfileService', () => {
  let service: MgProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MgProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
