import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
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
  password!: string;
  // LOGIN \\

  // REGISTER \\
  newUser!: NewUser;
  usernameRegister!: string;
  email!: string;
  passwordRegister!: string;  
  // REGISTER \\

  errMsg!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.username,this.password);
    this.authService.login(this.loginUser).subscribe({
      next: data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/new']);
      },
      error: err => {
        this.errMsg = err.error.mensaje;
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
      this.errMsg = err.error.mensaje; 
      alert(err.error.mensaje);
      }
    });
  }
}
