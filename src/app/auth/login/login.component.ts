import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { Persona } from 'src/app/models/persona';
import { AuthService } from 'src/app/service/auth.service';
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
  passwordLogin!: string;
  // LOGIN \\

  // REGISTER \\
  newUser!: NewUser;
  usernameReg!: string;
  emailReg!: string;
  passwordRegister!: string;  
  // REGISTER \\

  userPattern = "^(?=.{5,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]*).{6,20}$";
  
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  persona!: Persona;

  ngOnInit(): void {
    }

  onLogin(): void {
    this.loginUser = new LoginUser(this.username,this.passwordLogin);
    this.authService.login(this.loginUser).subscribe({
      next: data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/new']);
      },
      error: err => {        
        alert(err);
      }
    });
  }

  onRegister(): void {
    this.newUser = new NewUser(this.usernameReg, this.emailReg, this.passwordRegister);
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
