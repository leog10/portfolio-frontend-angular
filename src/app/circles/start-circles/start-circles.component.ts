import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Circle } from '../circle-object/Circle';
import { ICircle } from '../circle-object/ICircle';
import { CirclesDbService } from '../services/database/circles-db.service';

@Component({
  selector: 'app-start-circles',
  templateUrl: './start-circles.component.html',
  styleUrls: ['./start-circles.component.scss'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateX(0%)'})),
      state('void, closed', style({transform: 'translateX(0%)', opacity: 0})),
      transition('* => *', animate('450ms ease-in')),
    ])
  ],
})
export class StartCirclesComponent implements OnInit {

  constructor(private circlesDbService: CirclesDbService, private router: Router) { }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  circulos: ICircle[] = [];

  defaultCircle: ICircle = new Circle;

  buttonDisabled: boolean = true;

  @HostBinding('@state')
  state: 'opened' | 'closed' = 'opened';

  @Output()
  closed = new EventEmitter<void>();

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
    let buttonSave = (<HTMLInputElement> document.getElementById('saveButton'+(circle.id?.toString())));
    buttonSave.disabled = true;

    this.countdownTimer(5, buttonSave, 'Guardar');
  }

  increment(circle: ICircle, amount = 1) {
    circle.current += amount;
  }  

  decrement(circle: ICircle, amount = 1) {
    circle.current -= amount;    
  }

  getOverlayStyle(id: number) {
    let isSemi = false;
    let radius: number;

    for (let dato of this.circulos) {
      if (dato.id === id) {
        isSemi = dato.semicircle;
        radius = dato.radius;
      }
    }

    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      'font-size': radius! / 3.5 + 'px',
    };
  }

  //Borra el objeto en la base de datos segun el id pasado por parametro.
  borrarCirculoEnDb(circle: ICircle) {
    this.circlesDbService.deleteCircle(circle).subscribe(() =>{
      this.circulos = this.circulos.filter((dato) => dato.id !== circle.id);
    })
  }

  //Borra el Custom Element del DOM y borra el objeto de la base de datos.
  borrarCirculo(circle: ICircle) {
    (<HTMLInputElement> document.getElementById('deleteButton'+(circle.id?.toString()))).disabled = true;
    (<HTMLInputElement> document.getElementById('saveButton'+(circle.id?.toString()))).disabled = true;
    //Pasa el parametro id a string para manipular el DOM con getElementById que recibe un string como parametro.
    const _idToSring = circle.id!.toString();
    //Agrega la clase ' closing' con espacio para no generar conflicto con las clases existentes.
    //La clase .closing le da una animacion al eliminar el elemento.
    document.getElementById(_idToSring)!.className += ' closing';
    //Se crea un delay antes de eliminar el elemento para dar tiempo a la animacion de cierre a mostrarse en pantalla.
    setTimeout (() => {
      this.borrarCirculoEnDb(circle);
      if (this.circulos.length === 0) {
        this.closed.emit();
      }      
    }, 450);

    let newCircleButton = (<HTMLInputElement> document.getElementById('newCircle'));
    let divMaxCirclesReached = (<HTMLInputElement> document.getElementById('maxCirclesReached'));
      newCircleButton.disabled = false;
      divMaxCirclesReached.style.display = 'none';    
  }

  getCirclesFromDb() {
    this.circlesDbService.getData().subscribe((data) => {
      this.circulos = data;
    });
  }
  
  ngOnInit(): void {
    this.getCirclesFromDb();
  }

}
