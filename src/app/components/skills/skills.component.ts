import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Router } from '@angular/router';
import { CircleComponent } from 'src/app/circles/circle/circle.component';
import { CircleService } from 'src/app/circles/services/circle/circle.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  constructor(public router: Router, private circle: CircleService, injector: Injector) {
        // Convert `CircleComponent and StartCirclesComponent` to a custom element.
        const CircleElement = createCustomElement(CircleComponent, {injector});
        // Register the custom element with the browser.
        customElements.get('do-circle') ||
      customElements.define('do-circle', CircleElement);
   }

  createNewCirlce() {
    let newCircleButton = (<HTMLInputElement> document.getElementById('newCircle'));
    let divMaxCirclesReached = (<HTMLInputElement> document.getElementById('maxCirclesReached'));
    if (document.getElementById('appStartCircles')!.childElementCount > 5) {
      newCircleButton.disabled = true;
      divMaxCirclesReached.style.display = '';      
    } else {
      this.circle.showAsElement();
      newCircleButton.disabled = true;
      this.countdownTimer(5,newCircleButton,'Crear Circulo') 
    }
  }

  countdownTimer(timerInSeconds: number, element: HTMLInputElement, textToShow: string){
    let startTime = timerInSeconds;
    element.innerHTML = `${textToShow} (${startTime})`;
    let interval = setInterval(function(){
      if(startTime === 1){
        element.innerHTML = `${textToShow}`;
        clearInterval(interval);
        return;
      }
      startTime--;
      element.innerHTML = `${textToShow} (${startTime})`;
    }, 1000);

    setTimeout(() => {
      element.disabled = false;
    }, (timerInSeconds * 1000));
  }  
}

