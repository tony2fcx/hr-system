import { TestBed } from '@angular/core/testing';

import { Hrservice } from './hrservice';

describe('Hrservice', () => {
  let service: Hrservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hrservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
