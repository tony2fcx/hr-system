import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { hrTeamsResolver } from './hr-teams-resolver';

describe('hrTeamsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => hrTeamsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
