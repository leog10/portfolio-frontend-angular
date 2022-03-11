import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { FirebaseService } from 'src/app/service/firebase.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  username!: string;

  hasProfile!: boolean;
  routeHasProfile!: boolean;

  routeEdit: boolean = false; 

  persona: any;
  
  editPersona: any;  

  constructor(
    private tokenService: TokenService,
    private personaService: PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
    ) { }

  loadPersona(): void {
    const _username = this.activatedRoute.snapshot.params['username'];
    this.personaService.detailsByUsername(_username).subscribe({
      next: persona => {
        this.persona = persona;
        this.editPersona = new Persona(
          persona.firstName,
          persona.lastName,
          persona.position,
          persona.location,
          persona.aboutMe,
          persona.birthday,
          persona.backImg,
          persona.profileImg);
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

  onUpdate(): void {
    this.personaService.update(this.persona.id,this.editPersona).subscribe({
      next: () => {        
        this.ngOnInit();
      },
      error: err => {        
        alert(err.error.mensaje);
      }
    });
  }  

  //IMAGE UPLOAD
  uploadProgress: number[] = this.firebaseService.uploadProgress;

  private profileImgToUpload: File[] = [];

  //PROFILE IMAGE UPDATE
  profileImgListener(event: any) {
    this.profileImgToUpload = this.profileImgToUpload.splice(0,0);
    if (event.target.files[0] === undefined) {
      return;
    } else if (event.target.files[0].size > 2097152) {
      alert('Error: el peso de la imagen debe ser menor a 2 Mb')
      event.target.value = '';
    } else {
      this.profileImgToUpload.push(event.target.files[0]);      
    }    
  }

  onProfileImgUpdate() {
    (<HTMLInputElement> document.getElementById('saveProfileImgButton')).disabled = true;    
    const _profilePath = 'profileImg';
    if (this.persona.profileImg) {
      this.firebaseService.deleteImgInStorage(this.persona.profileImg);
    }
    this.firebaseService.uploadImage(this.persona.id,this.username,this.profileImgToUpload,_profilePath);    
  }

  //BACKGROUND UPDATE
  private backgroundImgToUpload: File[] = [];

  backgroundImgListener(event: any) {
    this.backgroundImgToUpload = this.backgroundImgToUpload.splice(0,0);
    if (event.target.files[0] === undefined) {
      return;
    } else if (event.target.files[0].size > 3145728) {
      alert('Error: el peso de la imagen debe ser menor a 3 Mb')
      event.target.value = '';
    } else {
      this.backgroundImgToUpload.push(event.target.files[0]);      
    }    
  }

  onBackgroundImgUpdate() {
    (<HTMLInputElement> document.getElementById('saveBackImgButton')).disabled = true;
    const _backgroundPath = 'backImg';
    if (this.persona.backImg) {
      this.firebaseService.deleteImgInStorage(this.persona.backImg);
    }    
    this.firebaseService.uploadImage(this.persona.id,this.username,this.backgroundImgToUpload,_backgroundPath);
  }

  //DELETE IMAGES
  deleteProfileImage(imageUrl: string) {
    (<HTMLInputElement> document.getElementById('deleteProfileImgButton')).disabled = true;
    const _imgObj = {"profileImg":""}
    this.firebaseService.deleteImg(this.persona.id , imageUrl, _imgObj);
  }

  deleteBackgroundImage(imageUrl: string) {
    (<HTMLInputElement> document.getElementById('deleteBackImgButton')).disabled = true;    
    const _imgObj = {"backImg":""}
    this.firebaseService.deleteImg(this.persona.id , imageUrl, _imgObj);
  }
  
  //END IMAGES

  ngOnInit(): void {
    this.loadPersona();
    this.username = this.tokenService.getUserName();
    this.routeEdit = this.router.url.includes(`edit/${this.username}`);
  }
}
