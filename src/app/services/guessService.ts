import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GuessService {

    @Output() GuessSubmittedEvent = new EventEmitter<number>();
    @Output() ResetEvent = new EventEmitter<void>();

    public SubmitGuess(birdId: number) {
      this.GuessSubmittedEvent.emit(birdId);
    }

    public ResetGame() {
      this.ResetEvent.emit();
    }
}