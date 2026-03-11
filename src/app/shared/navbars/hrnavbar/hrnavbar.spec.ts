import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hrnavbar } from './hrnavbar';

describe('Hrnavbar', () => {
  let component: Hrnavbar;
  let fixture: ComponentFixture<Hrnavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hrnavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hrnavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
