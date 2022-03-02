import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Router } from '@angular/router';
import { CircleComponent } from 'src/app/circles/circle/circle.component';
import { CircleService } from 'src/app/circles/services/circle/circle.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  routeEdit: boolean = false;

  username!: string;

  constructor(
    private tokenService: TokenService,
    private circle: CircleService,
    private router: Router,    
    injector: Injector) {
        // Convert `CircleComponent and StartCirclesComponent` to a custom element.
        const CircleElement = createCustomElement(CircleComponent, {injector});
        // Register the custom element with the browser.
        customElements.get('circle-element') ||
      customElements.define('circle-element', CircleElement);
   }
  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
    this.routeEdit = this.router.url.includes(`edit/${this.username}`);  
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

