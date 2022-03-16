import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  personas!: Persona[];

  username: any[] = [];

  constructor(
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.personaService.list().pipe(take(1)).subscribe({
      next: personas => {        
        this.personas = personas;
        for (let i = 0; i < 3; i++) {        
        this.personaService.usernameByPersonaId(this.personas[i].id!).pipe(take(1)).subscribe({
          next: username => {
              this.username.push(username);
            }
        });
      }      
      },
      error: err => {
        console.log(err.err.mensaje);
      }
    });    
  }

}
