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

  day: number = new Date().getDate();
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();

  persona!: Persona;

  firstName!: string;
  lastName!: string;
  position!: string;
  location!: string;
  aboutMe!: string;
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
    this.personaService.detailsByUsername(this.username).subscribe({
      next: persona => {
        this.persona = persona;
      },
      error: err => {
        console.log(err)
        }
      });
    setTimeout(() => {      
      if (this.persona) {
        this.router.navigate([`/portfolio/${this.username}`]);
      }
    }, 100);
  }

  onCreate(): void {
    let _day = this.day.toString();
    if (_day.length < 2) {
      _day = `0${this.day}`
    }
    let _month = this.month.toString();
    if (_month.length < 2) {
      _month = `0${this.month}`
    }
    this.birthday = _day + '-' + _month + '-' + this.year;
    this.persona = new Persona(this.firstName, this.lastName, this.position, this.location, this.aboutMe, this.birthday, this.backImg, this.profileImg);
    this.personaService.create(this.persona).subscribe({
      next: () => {
        this.router.navigate([`/edit/${this.username}`]);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
