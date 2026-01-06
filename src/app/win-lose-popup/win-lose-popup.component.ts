import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-win-lose-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './win-lose-popup.component.html',
  styleUrl: './win-lose-popup.component.css',
  inputs: ['isVisible', 'message'],
  outputs: ['reset']
})
export class WinLosePopupComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = '';
  @Output() reset = new EventEmitter<void>();
  
  onReset() {
    this.reset.emit();
  }
}
