import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CircleComponent } from './circle/circle.component';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html'
})
export class CirclesComponent {
  constructor(injector: Injector) {
    // Convert `CircleComponent and StartCirclesComponent` to a custom element.
    const CircleElement = createCustomElement(CircleComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('circle-element', CircleElement);
  }
}
