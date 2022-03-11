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

  constructor(
    private tokenService: TokenService,    
    private activatedRoute: ActivatedRoute,
    private experienceService: ExperienceService,
    private router: Router
  ) { }

  loadExperience(): void {
    const _username = this.activatedRoute.snapshot.params['username'];
    this.experienceService.detailsByUsername(_username).subscribe({
      next: experience => {
        this.experiences = experience;
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

  onUpdate(): void {    
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
