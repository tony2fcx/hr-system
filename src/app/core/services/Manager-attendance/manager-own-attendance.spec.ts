import { TestBed } from '@angular/core/testing';

import { ManagerOwnAttendance } from './manager-own-attendance';

describe('ManagerOwnAttendance', () => {
  let service: ManagerOwnAttendance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerOwnAttendance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
