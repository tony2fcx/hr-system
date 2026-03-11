import { TestBed } from '@angular/core/testing';

import { HrprofileService } from './hrprofile-service';

describe('HrprofileService', () => {
  let service: HrprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
