import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { managerOwnTeamViewResolver } from './manager-own-team-view-resolver';

describe('managerOwnTeamViewResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => managerOwnTeamViewResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
