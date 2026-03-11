import { TestBed } from '@angular/core/testing';

import { ManagerAssignService } from './manager-assign-service';

describe('ManagerAssignService', () => {
  let service: ManagerAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
