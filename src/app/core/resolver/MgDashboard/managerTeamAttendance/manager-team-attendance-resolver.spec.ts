import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { managerTeamAttendanceResolver } from './manager-team-attendance-resolver';

describe('managerTeamAttendanceResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => managerTeamAttendanceResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
