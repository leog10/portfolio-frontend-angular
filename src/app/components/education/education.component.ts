import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/service/education.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {  
  
  //ACTUAL USERNAME
  username!: string;

  routeEdit: boolean = false;

  //LIST OF EDUCATIONS
  educations: Education[] = [];  

  //ATTRIBUTES FOR NEW EDUCATION
  school!: string;
  title!: string;
  img!: string;
  career!: string;
  startTime!: string;
  endTime!: string;
  location!: string;  

  constructor(
    private tokenService: TokenService,    
    private activatedRoute: ActivatedRoute,
    private educationService: EducationService,
    private router: Router
  ) { }

  loadEducation(): void {
    const _username = this.activatedRoute.snapshot.params['username'];
    this.educationService.detailsByUsername(_username).subscribe({
      next: education => {
        this.educations = education;
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
    const education = new Education(this.school, this.title, this.img, this.career, this.startTime, this.endTime, this.location);
    this.educationService.create(education).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log('Error al crear la Educación',error);
      }
    });
  }

  //EDITABLE EDUCATION
  editEducation!: Education;

  indexOfEditEducation: number = 0;

  findIndexOfEducation(id: number): void {
    this.indexOfEditEducation = this.educations.findIndex(education => education.id === id);
  }

  loadEditEducation(): void {
    this.editEducation = new Education(
      this.educations[this.indexOfEditEducation].school,
      this.educations[this.indexOfEditEducation].title,
      this.educations[this.indexOfEditEducation].img,
      this.educations[this.indexOfEditEducation].career,
      this.educations[this.indexOfEditEducation].startTime,
      this.educations[this.indexOfEditEducation].endTime,
      this.educations[this.indexOfEditEducation].location
      );
  }

  editableEducation(id: number): void {
    this.findIndexOfEducation(id);
    this.loadEditEducation();
  }

  onUpdate(): void {    
    this.educationService.update(this.educations[this.indexOfEditEducation].id!,this.editEducation).subscribe({
      next: () => {
        this.ngOnInit();        
      },
      error: error => {        
        alert(error);
      }
    });
  }

  onDelete(id: number) {
    this.educationService.delete(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log('Error on delete: ',error);
      }
    });    
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
    this.routeEdit = this.router.url.includes(`edit/${this.username}`);
    this.loadEducation();    
  }
}
