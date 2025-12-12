import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdSelectorComponent } from './bird-selector.component';

describe('BirdSelectorComponent', () => {
  let component: BirdSelectorComponent;
  let fixture: ComponentFixture<BirdSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirdSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
