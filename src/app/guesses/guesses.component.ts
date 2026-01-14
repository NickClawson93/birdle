import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GuessService } from '../services/guessService'
import { Bird, Expansion, Food, Habitat } from '../bird';
import { SecretService } from '../services/secretService';
import { DataService } from '../services/dataService';
import { WinLosePopupComponent } from '../win-lose-popup/win-lose-popup.component';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-guesses',
  standalone: true,
  imports: [WinLosePopupComponent],
  templateUrl: './guesses.component.html',
  styleUrl: './guesses.component.css'
})
export class GuessesComponent {
  
  guessService = inject(GuessService);
  secretService = inject(SecretService);
  dataService = inject(DataService);
  cookieService = inject(CookieService);
  guesses: Bird[] = [];
  isPopupVisible = false;
  popupMessage = '';
  remainingGuesses: number = 6;

  ngOnInit() {
    this.guessService.GuessSubmittedEvent
    .subscribe((data: number) => {
      console.log('Event message from Component A: ' + data);
      this.addGuess(data);
    });

    this.guessService.ResetEvent
    .subscribe(() => {
      this.handleReset();
    });
  }

  public addGuess(guess: number): void
  {
    this.remainingGuesses--;
    const birdToAdd = this.dataService.GetBirds()[guess];
    if (birdToAdd !== undefined)
    {
      this.guesses.push(birdToAdd);
    }
    if (birdToAdd === this.secretService.GetSecretBird())
    {
      this.cookieService.set('hasPlayedToday', 'true', { expires: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 0, 0, 0) }); // Next midnight
      this.checkWinLoseCondition(true);
    }
    if (this.remainingGuesses == 0 && birdToAdd !== this.secretService.GetSecretBird())
    {
      this.cookieService.set('hasPlayedToday', 'true', { expires: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 0, 0, 0) }); // Next midnight
      this.checkWinLoseCondition(false);
    }
  }

  public getWingspanCompare(wingspan: number): string
  {
    let secretBirdWingspan = this.secretService.GetSecretBird().wingspan;
    if (wingspan == 0)
    {
      wingspan = secretBirdWingspan;
    }
    if (secretBirdWingspan == 0)
    {
      secretBirdWingspan = wingspan;
    }
    
    if (wingspan == secretBirdWingspan)
    {
      return ColorBackground.Correct;
    }
    if (Math.abs(wingspan - secretBirdWingspan) <= 15)
    {
      return ColorBackground.Similar;
    }
    else
    {
      return ColorBackground.Wrong;
    }
  }


  public getExpansionCompare(expansion: string): string
  {
    const secretBirdExpansion = this.secretService.GetSecretBird().expansion;
    if (expansion == this.secretService.GetSecretBird().expansion)
    {
      return ColorBackground.Correct;
    }
    else if (expansion == Expansion.BaseGame && secretBirdExpansion == Expansion.SwiftStart ||
            expansion == Expansion.SwiftStart && secretBirdExpansion == Expansion.BaseGame)
    {
      return ColorBackground.Correct;    
    }
    else
    {
      return ColorBackground.Wrong;
    }
  }

  public getPowerColorCompare(powerColor: string): string
  {
    if (powerColor == this.secretService.GetSecretBird().powerColor)
      {
        return ColorBackground.Correct;
      }
    else
    {
      return ColorBackground.Wrong;
    }
  }

  public getPowerCategoryCompare(powerCategory: string): string
  {
    if (powerCategory == this.secretService.GetSecretBird().powerCategory)
      {
        return ColorBackground.Correct;
      }
    else
    {
      return ColorBackground.Wrong;
    }
  }

  public getVictoryPointsCompare(victoryPoints: number): string
  {
    let secretBirdVictoryPoints = this.secretService.GetSecretBird().victoryPoints;

    if (victoryPoints == secretBirdVictoryPoints)
    {
      return ColorBackground.Correct;
    }
    if (Math.abs(victoryPoints - secretBirdVictoryPoints) == 1)
    {
      return ColorBackground.Similar;
    }
    else
    {
      return ColorBackground.Wrong;
    }
  }

  public getNestTypeCompare(nestType: string): string
  {
    let secretNestType = this.secretService.GetSecretBird().nestType;
    if (nestType == "Wild" || secretNestType == "Wild")
      {
        return ColorBackground.Correct;
      }
    else if (nestType == secretNestType)
    {
      return ColorBackground.Correct;
    }
    else
    {
      return ColorBackground.Wrong;
    }
  }

  public getEggCapacityCompare(eggCapacity: number): string
  {
    if (eggCapacity == this.secretService.GetSecretBird().eggCapacity)
    {
      return ColorBackground.Correct;
    }
    else
    {
      return ColorBackground.Wrong;
    }
  }
  
  public getHabitatsCompare(habitats: Habitat[]): string
  {
    let secretHabitats = this.secretService.GetSecretBird().habitats;
    if (secretHabitats.toString() == habitats.toString())
    {
      return ColorBackground.Correct;
    }

    let isSimilar = false;
    habitats.forEach(habitat => {
      if (secretHabitats.includes(habitat))
      {
        isSimilar = true;
      }
      
    });

    if (isSimilar)
    {
      return ColorBackground.Similar;
    }
    else
    {
      return ColorBackground.Wrong;
    }
  }
  
  public getFoodCostCompare(foodCost: number): string
  {
    if (foodCost == this.secretService.GetSecretBird().foodCost)
      {
        return ColorBackground.Correct;
      }
    else
    {
      return ColorBackground.Wrong;
    }
  }
  
  public getFoodsInCostCompare(foodsInCost: Food[]): string
  {
    let secretFoodsInCost = this.secretService.GetSecretBird().foodsInCost;
    if (secretFoodsInCost.toString() == foodsInCost.toString())
    {
      return ColorBackground.Correct;
    }

    let isSimilar = false;
    foodsInCost.forEach(food => {
      if (secretFoodsInCost.includes(food))
      {
        isSimilar = true;
      }
      
    });

    if (isSimilar)
    {
      return ColorBackground.Similar;
    }
    else
    {
      return ColorBackground.Wrong;
    }
  }

  public get food(): typeof Food {
    return Food; 
  }

  public get habitat(): typeof Habitat {
    return Habitat; 
  }

  async checkWinLoseCondition(didWin: boolean) {
    if (didWin) {
      this.popupMessage = 'You Win!';
      this.isPopupVisible = true;
    } else if (!didWin) {
      this.popupMessage = 'You Lose!';
      this.isPopupVisible = true;
    }

    // // TODO - this should be in the winlose component
    // try {
    //   const secretBird = this.secretService.GetSecretBird();
    //   const response = await firstValueFrom(this.dataService.getBirdFunFact(secretBird.name));
    //   const funFact = response.output[0].content[0].text;
    //   this.popupMessage += `\n\nFun Fact: ${funFact}`;
    // } catch (error) {
    //   console.error('Error fetching fun fact:', error);
    //   this.popupMessage += '\n\nFun Fact: Could not load fun fact.';
    // }
  }

  handleReset() {
    this.isPopupVisible = false;
    this.guesses = [];
    this.remainingGuesses = 6;
  }
}

export enum ColorBackground
{
  Wrong = "background-color: red",
  Similar = "background-color: yellow",
  Correct = "background-color: green"
}


