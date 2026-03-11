import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { employeeslistResolver } from './employeeslist-resolver';

describe('employeeslistResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => employeeslistResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
