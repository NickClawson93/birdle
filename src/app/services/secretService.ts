import { Injectable, EventEmitter, Output, inject } from '@angular/core';
import { Bird } from '../bird';
import { DataService } from './dataService';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
  })
export class SecretService {

    secretBird!: Bird;
    dataService = inject(DataService);
    cookieService = inject(CookieService);
    isPlayingBirdOfTheDay: boolean = true;

    constructor() {
        this.isPlayingBirdOfTheDay = this.cookieService.get('hasPlayedToday') === 'false';
    }
    public GetSecretBird(): Bird
    {
        if (this.secretBird == undefined)
        {      
            if (this.isPlayingBirdOfTheDay)
            {
                // Cycles through birds based on the date, not random
                const allBirds = this.dataService.GetBirds();
                const startDate = new Date(2024, 0, 1); // January 1, 2024
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - startDate.getTime());
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                this.secretBird = allBirds[diffDays % allBirds.length];
                return this.secretBird;
            }
            else
            {
                this.secretBird = this.getRandomBird();
            }
        }
        return this.secretBird;
    }

    public SetPlayingBirdOfTheDay(isPlaying: boolean)
    {
        this.isPlayingBirdOfTheDay = isPlaying;
    }

    public GetPlayingBirdOfTheDay(): boolean
    {
        return this.isPlayingBirdOfTheDay;
    }

    public PickNewSecretBird(): void
    {
        this.secretBird = this.getRandomBird();
    }

    private getRandomBird(): Bird
    {
        const allBirds = this.dataService.GetBirds();
        return allBirds[Math.floor(Math.random() * allBirds.length)];
    }
}