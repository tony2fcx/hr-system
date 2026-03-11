import { TestBed } from '@angular/core/testing';

import { MgViewTaskService } from './mg-view-task-service';

describe('MgViewTaskService', () => {
  let service: MgViewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MgViewTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
