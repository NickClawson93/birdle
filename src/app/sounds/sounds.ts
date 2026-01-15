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
  private activeAudios: HTMLAudioElement[] = [];
  isMuted: boolean = false;

  ngOnInit() {
    setInterval(() => this.playSound(), Math.random() * 2000 + 3000); // Longer interval for better layering
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      // Stop all currently playing audio
      this.activeAudios.forEach(audio => audio.pause());
    } else {
      // Resume all paused audio
      this.activeAudios.forEach(audio => audio.play().catch(error => console.error('Audio resume failed:', error)));
    }
  }

  playSound() {
    if (this.isMuted) return; // Skip playback if muted
    const numSounds = Math.floor(Math.random() * 2) + 2; // Play 2-3 sounds per call
    let delay = 0;
    for (let i = 0; i < numSounds; i++) {
      setTimeout(() => {
        if (this.isMuted) return; // Check again before actually playing
        const randomIndex = Math.floor(Math.random() * this.audioFiles.length);
        console.log('Playing sound:', this.audioFiles[randomIndex]);
        const audio = new Audio(this.audioFiles[randomIndex]);
        this.activeAudios.push(audio);
        
        // Remove from array when finished playing
        audio.addEventListener('ended', () => {
          this.activeAudios = this.activeAudios.filter(a => a !== audio);
        });
        
        audio.play().catch(error => console.error('Audio play failed:', error));
      }, delay);
      delay += Math.random() * 1000 + 500; // Random delay between 0.5-1.5 seconds for each additional sound
    }
  }
}
