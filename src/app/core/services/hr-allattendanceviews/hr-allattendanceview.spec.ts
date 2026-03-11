import { TestBed } from '@angular/core/testing';

import { HrAllattendanceview } from './hr-allattendanceview';

describe('HrAllattendanceview', () => {
  let service: HrAllattendanceview;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrAllattendanceview);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
