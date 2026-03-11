import { TestBed } from '@angular/core/testing';

import { ManagerOurTeamView } from './manager-our-team-view';

describe('ManagerOurTeamView', () => {
  let service: ManagerOurTeamView;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerOurTeamView);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
