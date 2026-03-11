import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { managerslistResolver } from './managerslist-resolver';

describe('managerslistResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => managerslistResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
