import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BirdSelectorComponent } from "./bird-selector/bird-selector.component";
import { GuessesComponent } from "./guesses/guesses.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BirdSelectorComponent, GuessesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'birdle';
}
