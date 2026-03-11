import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managernavbar } from './managernavbar';

describe('Managernavbar', () => {
  let component: Managernavbar;
  let fixture: ComponentFixture<Managernavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managernavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managernavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
