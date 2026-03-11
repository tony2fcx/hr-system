import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfileUpdate } from './hr-profile-update';

describe('HrProfileUpdate', () => {
  let component: HrProfileUpdate;
  let fixture: ComponentFixture<HrProfileUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrProfileUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrProfileUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
