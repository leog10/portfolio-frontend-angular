import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }

  public setRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string {
    return localStorage.getItem(REFRESHTOKEN_KEY)!;
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  public getUserName() {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];        
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;       
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public interceptorLogOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  public logOut(): void {
    window.localStorage.clear();
    window.location.href = `${window.location.origin}/`;
  }
}
