import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { managertaskviewResolver } from './managertaskview-resolver';

describe('managertaskviewResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => managertaskviewResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
