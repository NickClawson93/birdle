import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sounds',
  imports: [],
  templateUrl: './sounds.html',
  styleUrl: './sounds.css',
})
export class Sounds implements OnInit {
  private audioFiles: string[] = [
    'assets/sounds/Dove.mp3',
    'assets/sounds/Tweet.mp3',  
    'assets/sounds/Red-Winged Blackbird.mp3',
    'assets/sounds/Caw.mp3',
    'assets/sounds/Songbird.mp3',
    'assets/sounds/Grackle.mp3',
  ];

  ngOnInit() {
    setInterval(() => this.playSound(), Math.random() * 2000 + 3000); // Longer interval for better layering
  }

  playSound() {
    const numSounds = Math.floor(Math.random() * 2) + 2; // Play 2-3 sounds per call
    let delay = 0;
    for (let i = 0; i < numSounds; i++) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.audioFiles.length);
        console.log('Playing sound:', this.audioFiles[randomIndex]);
        const audio = new Audio(this.audioFiles[randomIndex]);
        audio.play().catch(error => console.error('Audio play failed:', error));
      }, delay);
      delay += Math.random() * 1000 + 500; // Random delay between 0.5-1.5 seconds for each additional sound
    }
  }
}
