import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { hrdashboardResolver } from './hrdashboard-resolver';

describe('hrdashboardResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => hrdashboardResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
