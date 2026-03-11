import { TestBed } from '@angular/core/testing';

import { ManagerTeamAttentance } from './manager-team-attentance';

describe('ManagerTeamAttentance', () => {
  let service: ManagerTeamAttentance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerTeamAttentance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
