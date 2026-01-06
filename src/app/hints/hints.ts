import { Component, Input, ViewChild, ElementRef, inject } from '@angular/core';
import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { SecretService } from '../services/secretService';

@Component({
  selector: 'app-hints',
  imports: [CdkDrag],
  templateUrl: './hints.html',
  styleUrl: './hints.css',
})
export class Hints {
  secretService = inject(SecretService);

  hint1: string = "The first letter of the bird is: " + this.secretService.GetSecretBird().name.charAt(0);
  hint2: string = "The scientific name of the bird is: " + this.secretService.GetSecretBird().scientificName;
  hint3: string = "The power description of the bird is: " + this.secretService.GetSecretBird().powerDescription;

  @ViewChild("hungryBird", {static: true}) hungryBird!: ElementRef<HTMLImageElement>;

  isDragging: boolean = false;
  isHovering: boolean = false;
  isFood1Visible: boolean = true;
  isFood2Visible: boolean = true;
  isFood3Visible: boolean = true;

  mouseEnter() {
    console.log("hovering started");
    this.isHovering = true;
  }
  mouseLeave() {
    console.log("hovering ended");
    this.isHovering = false;
  }

  dragFoodStart(event: CdkDragMove) {
    this.isHovering = false;
    let mousePointer = event.pointerPosition;
    let birdRect = this.hungryBird.nativeElement.getBoundingClientRect();

    event.source.element
    if (mousePointer.x > birdRect.left && mousePointer.x < birdRect.right &&
        mousePointer.y > birdRect.top && mousePointer.y < birdRect.bottom) 
    {
      console.log("hovering over bird");
      this.isHovering = true;
    }
  }


  dragFoodEnd(event: CdkDragEnd) {
    if (this.isHovering) {
      console.log("feeding bird");
      let foodId = event.source.element.nativeElement.getAttribute("id");
      if (foodId === "food1") {
        this.isFood1Visible = false;
      }
      else if (foodId === "food2") {
        this.isFood2Visible = false;
      }
      else if (foodId === "food3") {
        this.isFood3Visible = false;
      }
    }
    console.log("dragging ended");
    this.isHovering = false;
  }
}
