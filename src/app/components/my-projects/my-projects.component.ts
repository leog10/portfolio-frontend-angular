import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  //ACTUAL USERNAME
  username!: string;

  routeEdit: boolean = false;

  //LIST OF EDUCATIONS
  projects: Project[] = [];

  //ATTRIBUTES FOR NEW PROJECT
  name!: string;
  img!: string;
  description!: string;
  startTime!: string;
  endTime!: string;

  constructor(
    private tokenService: TokenService,    
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) { }

  loadProject(): void {
    const _username = this.activatedRoute.snapshot.params['username'];
    this.projectService.detailsByUsername(_username).subscribe({
      next: project => {
        this.projects = project;
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
    const _project = new Project(this.name, this.img, this.description, this.startTime, this.endTime);
    this.projectService.create(_project).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log('Error al crear Proyecto',error);
      }
    });
  }

  //EDITABLE PROJECT
  editProject!: Project;

  indexOfEditProject: number = 0;

  findIndexOfProject(id: number): void {
    this.indexOfEditProject = this.projects.findIndex(project => project.id === id);
  }

  loadEditProject(): void {
    this.editProject = new Project(
      this.projects[this.indexOfEditProject].name,
      this.projects[this.indexOfEditProject].img,
      this.projects[this.indexOfEditProject].description,
      this.projects[this.indexOfEditProject].startTime,
      this.projects[this.indexOfEditProject].endTime      
      );
  }

  editableProject(id: number): void {
    this.findIndexOfProject(id);
    this.loadEditProject();
  }

  onUpdate(): void {    
    this.projectService.update(this.projects[this.indexOfEditProject].id!,this.editProject).subscribe({
      next: () => {
        this.ngOnInit();        
      },
      error: error => {        
        alert(error);
      }
    });
  }

  onDelete(id: number) {
    this.projectService.delete(id).subscribe({
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
    if (this.router.url.includes('portfolio') || this.router.url.includes(this.username)) {
      this.loadProject();
    } else {
      const param = this.activatedRoute.snapshot.params['username'];
      this.router.navigate([`/portfolio/${param}`])
    }    
  }

}
