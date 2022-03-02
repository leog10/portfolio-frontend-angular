import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  username!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.username = this.tokenService.getUserName();
    if (this.tokenService.isLogged()) {
      this.router.navigate([`/portfolio/${this.username}`]);
      return false;
    }
    return true;
  }  
  
  
}
