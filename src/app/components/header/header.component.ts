import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from '../../service/token.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private personaService: PersonaService
    ) { }

  isLogged = false;

  username!: string;
  
  persona: any;

  getUserProfileImage() {
    this.personaService.detailsByUsername(this.username).subscribe({
      next: persona => {
        this.persona = persona;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onLogout() {
    this.tokenService.logOut();
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
    this.isLogged = this.tokenService.isLogged()
    this.getUserProfileImage();
    }  
}
