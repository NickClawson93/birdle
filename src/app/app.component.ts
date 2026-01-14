import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BirdSelectorComponent } from "./bird-selector/bird-selector.component";
import { GuessesComponent } from "./guesses/guesses.component";
import { Hints } from "./hints/hints";
import { Sounds } from "./sounds/sounds";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BirdSelectorComponent, GuessesComponent, Hints, Sounds],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'birdle';
}
