import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewTasks } from './manager-view-tasks';

describe('ManagerViewTasks', () => {
  let component: ManagerViewTasks;
  let fixture: ComponentFixture<ManagerViewTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerViewTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerViewTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
