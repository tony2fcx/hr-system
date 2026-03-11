import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { managerOwnAttendanceResolver } from './manager-own-attendance-resolver';

describe('managerOwnAttendanceResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => managerOwnAttendanceResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
