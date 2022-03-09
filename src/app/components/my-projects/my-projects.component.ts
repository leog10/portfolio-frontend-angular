import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { FirebaseService } from 'src/app/service/firebase.service';
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
  projectImg!: string;
  description!: string;
  startTime!: string;
  endTime!: string;

  constructor(
    private tokenService: TokenService,    
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private firebaseService: FirebaseService
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
    const _project = new Project(this.name, this.projectImg, this.description, this.startTime, this.endTime);
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
      this.projects[this.indexOfEditProject].projectImg,
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

  onDelete(id: number, imgUrl: string) {
    this.projectService.delete(id).subscribe({
      next: () => {
        if (imgUrl.length > 0) {
          this.deleteProjectImage(imgUrl);
        }        
        this.ngOnInit();
      },
      error: error => {
        console.log('Error on delete: ',error);
      }
    });    
  }

  //PROJECT IMAGE UPDATE
  uploadProgress: number[] = this.firebaseService.uploadProgress;

  private projectImgToUpload: File[] = [];

  projectImgListener(event: any) {
    this.projectImgToUpload = this.projectImgToUpload.splice(0,0);
    if (event.target.files[0] === undefined) {
      return;
    } else if (event.target.files[0].size > 1048576) {
      alert('Error: el peso de la imagen debe ser menor a 1 Mb')
      event.target.value = '';
    } else {
      this.projectImgToUpload.push(event.target.files[0]);
    }    
  }

  onProjectImgUpdate(img: string) {
    (<HTMLInputElement> document.getElementById('saveProjectImgButton')).disabled = true;
    const _projectPath = 'projectImg';
    if (img) {
      this.firebaseService.deleteImgInStorage(img);
    }
    this.firebaseService.uploadImage(this.projects[this.indexOfEditProject].id!,this.username,this.projectImgToUpload,_projectPath);
  }

  //DELETE IMAGES
  deleteProjectImage(imageUrl: string) {
    if ((<HTMLInputElement> document.getElementById('deleteProjectImgButton'))) {
      (<HTMLInputElement> document.getElementById('deleteProjectImgButton')).disabled = true;
    }    
    const _imgObj = {"projectImg":""}
    this.firebaseService.deleteImg(this.projects[this.indexOfEditProject].id!, imageUrl, _imgObj);
  } 
  
  //END IMAGES

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
