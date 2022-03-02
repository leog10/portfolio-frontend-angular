import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Router } from '@angular/router';
import { Circle } from '../circle-object/Circle';
import { ICircle } from '../circle-object/ICircle';
import { CirclesDbService } from '../services/database/circles-db.service';

@Component({
  selector: 'my-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateX(0%)'})),
      state('void, closed', style({transform: 'translateX(0%)', opacity: 0})),
      transition('* => *', animate('450ms ease-in')),
    ])
  ],
})
export class CircleComponent {

  constructor(private circlesDbService: CirclesDbService, private router: Router) { }

  @HostBinding('@state')
  state: 'opened' | 'closed' = 'opened';

  @Output()
  closed = new EventEmitter<void>();
  
  @Output()
  deleteCircle = new EventEmitter<ICircle>();

  @Output()
  closing = new EventEmitter<void>();

  hasRoute(): boolean {
    return this.router.url.includes('edit');
  }

  buttonDisabled: boolean = true;

  circulos: ICircle[] = [];

  circle: ICircle = new Circle;

  borrarCirculoEnDb(circle: ICircle) {
    this.circlesDbService.deleteCircle(circle).subscribe(() =>{
      this.circulos = this.circulos.filter((dato) => dato.id !== circle.id);
    })
  }

  borrarCirculo(circle: ICircle) {
    this.closing.emit();
    (<HTMLInputElement> document.getElementById('deleteButton'+(this.circle.id?.toString()))).disabled = true;
    (<HTMLInputElement> document.getElementById('saveButton'+(this.circle.id?.toString()))).disabled = true;
    setTimeout (() => {
      this.closed.emit();
      this.borrarCirculoEnDb(circle);      
   }, 450);

   let newCircleButton = (<HTMLInputElement> document.getElementById('newCircle'));
   let divMaxCirclesReached = (<HTMLInputElement> document.getElementById('maxCirclesReached'));
    newCircleButton.disabled = false;
    divMaxCirclesReached.style.display = 'none';
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

  saveCircle(circle: ICircle) {
    this.circlesDbService.updateCircle(circle).subscribe();

    let buttonSave = (<HTMLInputElement> document.getElementById('saveButton'+(this.circle.id?.toString())));
    buttonSave.disabled = true;

    this.countdownTimer(5,buttonSave,'Guardar');
  }

  // CIRCULO VARIABLES Y METODOS

  increment(amount = 1) {
    this.circle.current += amount;
  }

  decrement(amount = 1) {
    this.circle.current -= amount;
  }

  getOverlayStyle() {
    const isSemi = this.circle.semicircle;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      'font-size': this.circle.radius / 3.5 + 'px',
    };
  }

  ngOnInit(): void {
    this.circlesDbService.addCircle(this.circle).subscribe();
  }
}
