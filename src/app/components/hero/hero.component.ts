import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  username!: string;

  routeEdit: boolean = false; 

  persona: any;
  
  editPersona: any;

  backImg: string = '';
  profileImg: string = '';

  constructor(
    private tokenService: TokenService,
    private personaService: PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  collapse() {
    document.getElementById('MenuNavegacion')!.className = 'navbar-collapse py-0 collapsing';
  }

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
        window.location.reload();
      },
      error: err => {        
        alert(err.error.mensaje);
      }
    });
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
    this.routeEdit = this.router.url.includes(`edit/${this.username}`);
    if (this.router.url.includes('portfolio') || this.router.url.includes(this.username)) {      
      this.loadPersona();
    } else {
      const param = this.activatedRoute.snapshot.params['username'];
      this.router.navigate([`/portfolio/${param}`])
    }
  }
}
