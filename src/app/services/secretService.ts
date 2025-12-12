import { Injectable, EventEmitter, Output, inject } from '@angular/core';
import { Bird } from '../bird';
import { DataService } from './dataService';

@Injectable({
    providedIn: 'root'
  })
export class SecretService {

    secretBird!: Bird;
    dataService = inject(DataService);

    public GetSecretBird(): Bird
    {
        if (this.secretBird == undefined)
        {
            const allBirds = this.dataService.GetBirds();
            this.secretBird = allBirds[Math.floor(Math.random() * allBirds.length)];
        }
        return this.secretBird;
    }
}