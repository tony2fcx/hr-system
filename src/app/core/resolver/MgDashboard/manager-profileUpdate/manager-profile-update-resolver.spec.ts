import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { managerProfileUpdateResolver } from './manager-profile-update-resolver';

describe('managerProfileUpdateResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => managerProfileUpdateResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
