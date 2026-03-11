import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTeamView } from './our-team-view';

describe('OurTeamView', () => {
  let component: OurTeamView;
  let fixture: ComponentFixture<OurTeamView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTeamView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurTeamView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
