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

  personaPlaceholder: any;
  aboutMePlaceholder: any;

  persona: any;
  
  // Persona Editable
  editFirstName!: string
  editLastName!: string
  editPosition!: string
  editLocation!: string
  editAboutMe!: string
  editBirthday!: string
  editBackImg!: string
  editProfileImg!: string

  constructor(
    private tokenService: TokenService,
    private personaService: PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
    ) { }

    // Carga la persona según el parametro 'username' en la ruta.
    // Busca persona en base de datos por usuario y la asigna a la variable persona.    
  loadPersona(): void {
    const _username = this.activatedRoute.snapshot.params['username'];
    this.personaService.detailsByUsername(_username).subscribe({
      next: persona => {
        this.personaPlaceholder = persona;
        this.aboutMePlaceholder = persona;
        this.persona = persona;        
        // Carga los datos de la persona en una variable alternativa para \
        // evitar actualizar la vista al mismo tiempo que se edita con NgModel.
        this.editFirstName = persona.firstName;
        this.editLastName = persona.lastName;
        this.editPosition = persona.position;
        this.editLocation = persona.location;
        this.editAboutMe = persona.aboutMe;
        this.editBirthday = persona.birthday;
        this.editBackImg = persona.backImg;
        this.editProfileImg = persona.profileImg;
      },
      error: err => {
        console.log('Error: ',err.error.mensaje);
      }
    });
  }  

  // Actualiza el perfil y mantiene el atributo aboutMe original.
  updateProfile(): void {
    this.personaPlaceholder = '';
    const _persona = new Persona(
      this.editFirstName, 
      this.editLastName, 
      this.editPosition, 
      this.editLocation, 
      this.persona.aboutMe, 
      this.editBirthday, 
      this.editBackImg, 
      this.editProfileImg);
    this.personaService.update(this.persona.id, _persona).subscribe({
      next: () => {        
        this.ngOnInit();
      },
      error: err => {        
        console.log('Error: ',err.error.mensaje);
      }
    });
  }

  // Actualiza el atributo aboutMe y mantiene los demas originales.
  updateAbout(): void {
    this.aboutMePlaceholder = '';
    const _persona = new Persona(
      this.persona.firstName, 
      this.persona.lastName, 
      this.persona.position, 
      this.persona.location, 
      this.editAboutMe, 
      this.persona.birthday, 
      this.persona.backImg, 
      this.persona.profileImg);
    this.personaService.update(this.persona.id, _persona).subscribe({
      next: () => {        
        const _username = this.activatedRoute.snapshot.params['username'];
      this.personaService.detailsByUsername(_username).subscribe({
        next: persona => {        
          this.aboutMePlaceholder = persona.aboutMe;
          this.persona.aboutMe = persona.aboutMe;
        },
      });
      },
      error: err => {        
        console.log('Error: ',err.error.mensaje);
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
