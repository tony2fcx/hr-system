import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managersidebar } from './managersidebar';

describe('Managersidebar', () => {
  let component: Managersidebar;
  let fixture: ComponentFixture<Managersidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managersidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managersidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
