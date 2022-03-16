import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  //ACTUAL USERNAME
  username!: string;

  routeEdit: boolean = false;

  experiencePlaceholder: string = 'loading';
  //LIST OF EXPERIENCES
  experiences: Experience[] = [];

  //ATTRIBUTES FOR NEW EXPERIENCE
  position!: string;
  company!: string;
  img!: string;
  mode!: string;
  startTime!: string;
  endTime!: string;
  timeAtPosition!: string;
  location!: string;

  // DATE FORMATTING
  startTimeText: string[] = [];
  endTimeText: string[] = [];

  // Obtiene las fechas y las separa con split('-'). Ej: 2022-04
  getTimes(experiences: Experience[]) {
    for (const experience of experiences) {
      this.startTimeText.push(experience.startTime);
      this.endTimeText.push(experience.endTime);
    }
  }

  startTimeFormatted: string[] = [];
  endTimeFormatted: string[] = [];

  // Recorre los array de fechas obtenidas con getTimes y les da formato\
  // de fecha con mes en texto corto. Ej: abr. 2022
  formatTime(startTime: string[], endTime: string[]) {
    for (const time of startTime) {
      const yearMonth: string[] = time.split('-');
      const date = new Date(Number(yearMonth[0]) ,Number(yearMonth[1])-1);
      const dateFormatted = date.toLocaleString('default', { month: 'short' })+`. ${yearMonth[0]}`;
      this.startTimeFormatted.push(dateFormatted);
    };
    for (const time of endTime) {
      if (time === 'actualidad') {
        this.endTimeFormatted.push('actualidad');
        continue;
      }
      const yearMonth: string[] = time.split('-');      
      const date = new Date(Number(yearMonth[0]) ,Number(yearMonth[1])-1);
      const dateFormatted = date.toLocaleString('default', { month: 'short' })+`. ${yearMonth[0]}`;
      this.endTimeFormatted.push(dateFormatted);
    };    
  }

  // Recorre los array de fechas obtenidas con getTimes y separa con split('-'). Ej: 2022-04\
  // los meses y años en arrays de fecha inicio y fecha fin. Ej: fechaFin === [2022,1995]
  // Llama a dateDiff para restar las fechas de inicio y fin en orden de posicion index.
  timeElapsedCalc(startTime: string[], endTime: string[]) {
    let startYears = [];
    let startMonths = [];
    for (const time of startTime) {
      const yearMonth: string[] = time.split('-');      
      startYears.push(yearMonth[0]);
      startMonths.push(yearMonth[1]);
    };
    let endYears = [];
    let endMonths = [];
    for (const time of endTime) {
      if (time === 'actualidad') {
        endYears.push('actualidad');
        endMonths.push('actualidad');
        continue;
      }
      const yearMonth: string[] = time.split('-');
      endYears.push(yearMonth[0]);
      endMonths.push(yearMonth[1]);
    };

    for (let i = 0; i < startYears.length; i++) {
      this.dateDiff(Number(endYears[i]), Number(startYears[i]), Number(endMonths[i]), Number(startMonths[i]));       
    }
  }

  // TIEMPO EN LA POSICION
  // UTILIZADO EN HTML
  timeElapsed: string[] = [];

  // Las fechas endYear y endMonth pueden contener el string 'actualidad' por lo tanto\
  // devolveran NaN.
  // Se evalua si las respectivas fechas son NaN y se crea una nueva fecha(hoy).
  // Se extrae el año actual y se asigna a _endYear para ser utilizado en adelante.
  // Se extrae el mes actual y se asigna a _endMonth (y se suma 1 ya que Date.getMonth()\
  // devuelve el index en un array de 12 posiciones) para ser utilizado en adelante.
  // El resultado se guarda en timeElapsed.
  dateDiff(endYear: number, startYear: number, endMonth: number, startMonth: number) {
    let _endYear = endYear;
    let _endMonth = endMonth;

    if (Number.isNaN(endYear)) {      
      let today = new(Date);
      _endYear = today.getFullYear();      
    }

    if (Number.isNaN(endMonth)) {
      let today = new(Date);      
      _endMonth = today.getMonth()+1;      
    }

    if (_endMonth < startMonth) {
      _endYear--;
      _endMonth += 12;
    }

    if (_endYear - startYear === 0 && _endMonth - startMonth === 0) {
      this.timeElapsed.push(`0 meses`);
    } else if (_endYear - startYear === 0 && _endMonth - startMonth === 1) {
      this.timeElapsed.push(`1 mes`);
    } else if (_endYear - startYear === 0) {
      this.timeElapsed.push(`${_endMonth - startMonth} meses`);
    } else if (_endYear - startYear !== 0 && _endMonth - startMonth === 0) {
      this.timeElapsed.push(`${_endYear - startYear} años`);
    } else if (_endYear - startYear !== 0 && _endMonth - startMonth === 1) {
      this.timeElapsed.push(`${_endYear - startYear} años 1 mes`);
    } else {
      this.timeElapsed.push(`${_endYear - startYear} años ${_endMonth - startMonth} meses`);
    }
  }

  constructor(
    private tokenService: TokenService,    
    private activatedRoute: ActivatedRoute,
    private experienceService: ExperienceService,
    private router: Router
  ) { }

  loadExperience(): void {
    // Reset a todas los calculos de fechas.
    this.startTimeText = [];
    this.endTimeText = [];
    this.startTimeFormatted = [];
    this.endTimeFormatted = [];
    this.timeElapsed = [];
    // Fin reset.
    const _username = this.activatedRoute.snapshot.params['username'];
    this.experienceService.detailsByUsername(_username).subscribe({
      next: experience => {
        this.experiences = experience;
        this.experiencePlaceholder = 'loaded'
        // Obtiene las fechas y las separa con split('-'). Ej: 2022-04
        this.getTimes(experience);
        // Recorre el array de fechas obtenidas con getTimes y le da formato\
        // de fecha con mes en texto corto. Ej: abr. 2022 
        this.formatTime(this.startTimeText, this.endTimeText);
        this.timeElapsedCalc(this.startTimeText, this.endTimeText);
      },
      error: err => {
        if (!this.username) {
          this.router.navigate(['/login']);
        } else {
          console.log(err);
        }        
      }
    });
  }

  isActualJob(event: any) {
    if (event.target.checked) {
      this.endTime = 'actualidad';
    } else {
      this.endTime = '';
    }    
  }

  onCreate(): void {
    const _experience = new Experience(
      this.position,
      this.company,
      this.img,
      this.mode,
      this.startTime,
      this.endTime,
      this.timeAtPosition,
      this.location
      );
      this.experiencePlaceholder = 'loading'
    this.experienceService.create(_experience).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log('Error al crear Experiencia',error);
      }
    });
  }

  onDelete(id: number) {
    this.experiencePlaceholder = 'loading'
    this.experienceService.delete(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log('Error on delete: ',error);
      }
    });    
  }

  //EDITABLE EXPERIENCE
  editExperience!: Experience;

  indexOfEditExperience: number = 0;

  findIndexOfExperience(id: number): void {
    this.indexOfEditExperience = this.experiences.findIndex(experience => experience.id === id);
  }

  loadEditExperience(): void {
    this.editExperience = new Experience(      
      this.experiences[this.indexOfEditExperience].position,
      this.experiences[this.indexOfEditExperience].company,
      this.experiences[this.indexOfEditExperience].img,
      this.experiences[this.indexOfEditExperience].mode,
      this.experiences[this.indexOfEditExperience].startTime,
      this.experiences[this.indexOfEditExperience].endTime,
      this.experiences[this.indexOfEditExperience].timeAtPosition,
      this.experiences[this.indexOfEditExperience].location,
      );      
  }

  editableExperience(id: number): void {
    this.findIndexOfExperience(id);
    this.loadEditExperience();
  }

  updateEditExperienceActualJob(event: any) {
    if (event.target.checked) {
      this.editExperience.endTime = 'actualidad';
    } else {
      this.editExperience.endTime = '';
    }    
  }

  onUpdate(): void {
    this.experiencePlaceholder = 'loading'
    this.experienceService.update(this.experiences[this.indexOfEditExperience].id!,this.editExperience).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {        
        alert(error);
      }
    });
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
    this.routeEdit = this.router.url.includes(`edit/${this.username}`);
    this.loadExperience();
  }
}
