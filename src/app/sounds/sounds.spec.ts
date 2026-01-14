import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sounds } from './sounds';

describe('Sounds', () => {
  let component: Sounds;
  let fixture: ComponentFixture<Sounds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sounds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sounds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
