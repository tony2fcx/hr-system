import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hrsidebar } from './hrsidebar';

describe('Hrsidebar', () => {
  let component: Hrsidebar;
  let fixture: ComponentFixture<Hrsidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hrsidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hrsidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
