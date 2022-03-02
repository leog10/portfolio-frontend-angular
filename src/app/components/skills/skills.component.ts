import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateX(0%)'})),
      state('void, closed', style({transform: 'translateX(0%)', opacity: 0})),
      transition('* => *', animate('450ms ease-in')),
    ])
  ],
})
export class SkillsComponent implements OnInit {
  @HostBinding('@state')
  state: 'opened' | 'closed' = 'opened';

  @Output()
  closed = new EventEmitter<void>();

  routeEdit: boolean = false;

  username!: string;

  skills: Skill[] = [];

  constructor(
    private tokenService: TokenService,
    private skillService: SkillService,    
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }  

  newSkill() {
    const _skill = new Skill(80,100,80,false,20,true,true,'#45ccce','#eaeaea',1500,'easeOutBounce',1,'Titulo')
    this.skillService.create(_skill).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log('Error al crear skill',error);
      }
    });    
    }

  createSkill() {
    let newSkillButton = (<HTMLInputElement> document.getElementById('newSkill'));
    let divMaxSkillsReached = (<HTMLInputElement> document.getElementById('maxSkillsReached'));
    if (document.getElementById('startSkills')!.childElementCount > 5) {
      newSkillButton.disabled = true;
      divMaxSkillsReached.style.display = '';
    } else {
      this.newSkill();
      newSkillButton.disabled = true;
      this.countdownTimer(5,newSkillButton,'Agregar Skill') 
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

  saveCircle(skill: Skill) {
    this.skillService.update(skill).subscribe();
    let buttonSave = (<HTMLInputElement> document.getElementById('saveButton'+(skill.id?.toString())));
    buttonSave.disabled = true;

    this.countdownTimer(5, buttonSave, 'Guardar');
  }

  increment(skill: Skill, amount = 1) {
    skill.current += amount;
  }  

  decrement(skill: Skill, amount = 1) {
    skill.current -= amount;    
  }

  getOverlayStyle(id: number) {
    let isSemi = false;
    let radius: number;

    for (let dato of this.skills) {
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
  borrarSkillEnDb(skill: Skill) {
    this.skillService.delete(skill).subscribe(() =>{
      this.skills = this.skills.filter((dato) => dato.id !== skill.id);
    });
  }

  //Borra el Custom Element del DOM y borra el objeto de la base de datos.
  deleteSkill(skill: Skill) {
    (<HTMLInputElement> document.getElementById('deleteButton'+(skill.id?.toString()))).disabled = true;
    (<HTMLInputElement> document.getElementById('saveButton'+(skill.id?.toString()))).disabled = true;
    //Pasa el parametro id a string para manipular el DOM con getElementById que recibe un string como parametro.
    const _idToSring = skill.id!.toString();
    //Agrega la clase ' closing' con espacio para no generar conflicto con las clases existentes.
    //La clase .closing le da una animacion al eliminar el elemento.
    document.getElementById(_idToSring)!.className += ' closing';
    //Se crea un delay antes de eliminar el elemento para dar tiempo a la animacion de cierre a mostrarse en pantalla.
    setTimeout (() => {
      this.borrarSkillEnDb(skill);
      if (this.skills.length === 0) {
        this.closed.emit();
      }      
    }, 450);

    let newSkillButton = (<HTMLInputElement> document.getElementById('newSkill'));
    let divMaxSkillsReached = (<HTMLInputElement> document.getElementById('maxSkillsReached'));
      newSkillButton.disabled = false;
      divMaxSkillsReached.style.display = 'none';
  }

  loadSkills(): void {
    const _username = this.activatedRoute.snapshot.params['username'];
    this.skillService.detailsByUsername(_username).subscribe({
      next: skill => {
        this.skills = skill;
      },
      error: () => {
        if (!this.username) {
          this.router.navigate(['/login']);
        } else {
          window.location.href = `${window.location.origin}/portfolio/${this.username}`;
        }        
      }
    });
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
    this.routeEdit = this.router.url.includes(`edit/${this.username}`);
    this.loadSkills();
  }  
}

