import { Component, inject } from '@angular/core';
import { GuessService } from '../services/guessService'
import { Bird, Expansion, Food, Habitat } from '../bird';
import { SecretService } from '../services/secretService';
import { DataService } from '../services/dataService';
import { WinLosePopupComponent } from '../win-lose-popup/win-lose-popup.component';

@Component({
  selector: 'app-guesses',
  standalone: true,
  imports: [WinLosePopupComponent],
  templateUrl: './guesses.component.html',
  styleUrl: './guesses.component.scss'
})
export class GuessesComponent {
  
  guessService = inject(GuessService);
  secretService = inject(SecretService);
  dataService = inject(DataService);
  guesses: Bird[] = [];
  isPopupVisible = false;
  popupMessage = '';

  ngOnInit() {
    this.guessService.GuessSubmittedEvent
    .subscribe((data: number) => {
      console.log('Event message from Component A: ' + data);
      this.addGuess(data);
    });
  }

  public addGuess(guess: number): void
  {
    const birdToAdd = this.dataService.GetBirds()[guess];
    if (birdToAdd !== undefined)
    {
      this.guesses.push(birdToAdd);
    }
    if (birdToAdd === this.secretService.GetSecretBird())
    {
      this.checkWinLoseCondition(true);
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

  checkWinLoseCondition(didWin: boolean) {
    if (didWin) {
      this.popupMessage = 'You Win!';
      this.isPopupVisible = true;
    } else if (!didWin) {
      this.popupMessage = 'You Lose!';
      this.isPopupVisible = true;
    }
  }

  handleReset() {
    this.isPopupVisible = false;
    // Reset game logic here
  }
}

export enum ColorBackground
{
  Wrong = "background-color: red",
  Similar = "background-color: yellow",
  Correct = "background-color: green"
}


