import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mgDashboardResolver } from './mg-dashboard-resolver';

describe('mgDashboardResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mgDashboardResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
