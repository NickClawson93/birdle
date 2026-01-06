import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BirdSelectorComponent } from "./bird-selector/bird-selector.component";
import { GuessesComponent } from "./guesses/guesses.component";
import { Hints } from "./hints/hints";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BirdSelectorComponent, GuessesComponent, Hints],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'birdle';
}
