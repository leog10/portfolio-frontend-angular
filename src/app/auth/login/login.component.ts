import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { Persona } from 'src/app/models/persona';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { LoginUser } from './../../models/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  // LOGIN \\
  loginUser!: LoginUser;
  username!: string;
  password!: string;
  // LOGIN \\

  // REGISTER \\
  newUser!: NewUser;
  usernameRegister!: string;
  email!: string;
  passwordRegister!: string;  
  // REGISTER \\

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,

    //test
    private personaService: PersonaService
  ) { }

  persona!: Persona;

  ngOnInit(): void {
    }

  onLogin(): void {
    this.loginUser = new LoginUser(this.username,this.password);
    this.authService.login(this.loginUser).subscribe({
      next: data => {
        this.tokenService.setToken(data.token);        

        this.personaService.detailsByUsername(this.username).subscribe({
          next: persona => {
            this.persona = persona;
          },
          error: err => {
            }
          });
        setTimeout(() => {
          if (this.persona) {
            this.router.navigate([`/portfolio/${this.username}`]);
          } else {
            this.router.navigate(['/new']);
          }
        }, 100);

      },
      error: err => {        
        alert(err);
      }
    });
  }

  onRegister(): void {
    this.newUser = new NewUser(this.usernameRegister, this.email, this.passwordRegister);
    this.authService.new(this.newUser).subscribe({
      next: () => {
        window.location.reload();
      },
      error: err => {        
        alert(err);
      }
    });
  }
}