import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GuessService {

    @Output() GuessSubmittedEvent = new EventEmitter<number>();

    public SubmitGuess(birdId: number) {
      this.GuessSubmittedEvent.emit(birdId);
    }
}