import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAssign } from './manager-assign';

describe('ManagerAssign', () => {
  let component: ManagerAssign;
  let fixture: ComponentFixture<ManagerAssign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAssign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAssign);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
