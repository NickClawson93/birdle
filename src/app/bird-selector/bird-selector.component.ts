import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessService } from '../services/guessService';
import { Bird } from '../bird';
import { DataService } from '../services/dataService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bird-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bird-selector.component.html',
  styleUrl: './bird-selector.component.scss',
})
export class BirdSelectorComponent {
  searchString: string = "";
  guessService = inject(GuessService);
  dataService = inject(DataService)
  birdList: Bird[] = this.dataService.GetBirds();
  filteredList: Bird[] = [];
  selectedBird: Bird | null = null;

  constructor(private elementRef: ElementRef)
  {

  }

  public selectBird(index: number): void
  {
    this.selectedBird = this.birdList[index];
    this.searchString = this.birdList[index].name;
    this.filteredList = [];
  }

  public filterBirds(searchString: string)
  {
    if (!searchString)
    {
      this.filteredList = this.birdList;
      return;
    }

    this.filteredList = this.birdList.filter(
      bird => bird.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchString.toLowerCase())
    );
  }

  public submitGuess()
  {
    if (!this.selectedBird)
    {
      return;
    }
    this.guessService.SubmitGuess(this.selectedBird.id);
    this.selectedBird = null;
  }

  public onFocusLost(event: FocusEvent)
  {
    setTimeout(() => {
      this.filteredList = [];
    }, 200);
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent)
  {
    if (!this.elementRef.nativeElement.contains(event.target))
    {
      this.filteredList = [];
    }
  }
}
