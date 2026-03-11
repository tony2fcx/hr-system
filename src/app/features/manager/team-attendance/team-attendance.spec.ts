import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendance } from './team-attendance';

describe('TeamAttendance', () => {
  let component: TeamAttendance;
  let fixture: ComponentFixture<TeamAttendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamAttendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAttendance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
