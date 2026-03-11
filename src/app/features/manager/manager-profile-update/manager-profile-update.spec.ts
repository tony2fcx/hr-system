import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProfileUpdate } from './manager-profile-update';

describe('ManagerProfileUpdate', () => {
  let component: ManagerProfileUpdate;
  let fixture: ComponentFixture<ManagerProfileUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerProfileUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerProfileUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
