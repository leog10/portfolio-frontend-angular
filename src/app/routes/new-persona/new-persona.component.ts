import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../service/persona.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-new-persona',
  templateUrl: './new-persona.component.html',
  styleUrls: ['./new-persona.component.scss']
})
export class NewPersonaComponent implements OnInit {

  username!: string;

  hasProfile!: boolean;

  persona!: Persona;

  firstName!: string;
  lastName!: string;
  position!: string;
  location!: string;
  aboutMeNew!: string;
  birthday!: string;
  backImg!: string;
  profileImg!: string;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
    this.personaService.existsByUsername(this.username).subscribe({
      next: exists => {
        this.hasProfile = exists;
        if (this.hasProfile) {
          this.router.navigate([`/portfolio/${this.username}`]);
        }
      },
      error: err => {
        console.log('Error: ',err.error.mensaje)
        }
      });    
  }

  onCreate(): void {
    this.persona = new Persona(this.firstName, this.lastName, this.position, this.location, this.aboutMeNew, this.birthday, this.backImg, this.profileImg);
    this.personaService.create(this.persona).subscribe({
      next: () => {
        this.router.navigate([`/edit/${this.username}`]);
      },
      error: err => {
        if (err.error.mensaje === 'Fields (firstName, lastName) should not be empty') {
          console.log('Error: ',err.error.mensaje);
        } else {
          console.log('Error: Date invalid');
        }        
      }
    });
  }
}
