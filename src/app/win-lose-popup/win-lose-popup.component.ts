import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretService } from '../services/secretService';
import { GuessService } from '../services/guessService';

@Component({
  selector: 'app-win-lose-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './win-lose-popup.component.html',
  styleUrl: './win-lose-popup.component.css',
  inputs: ['isVisible', 'message'],
  outputs: ['reset']
})
export class WinLosePopupComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = '';

  secretService = inject(SecretService);
  guessService = inject(GuessService);
  
  onReset() {
    this.guessService.ResetGame();
    this.secretService.SetPlayingBirdOfTheDay(false);
    this.secretService.PickNewSecretBird();
  }
}
