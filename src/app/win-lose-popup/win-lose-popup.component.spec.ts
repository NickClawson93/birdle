import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinLosePopupComponent } from './win-lose-popup.component';

describe('WinLosePopupComponent', () => {
  let component: WinLosePopupComponent;
  let fixture: ComponentFixture<WinLosePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinLosePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinLosePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
