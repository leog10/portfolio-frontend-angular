import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonaService } from '../service/persona.service';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class NewPersonaGuard implements CanActivate {

  username!: string;
  hasProfile!: boolean;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private personaService: PersonaService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.username = this.tokenService.getUserName();
    this.personaService.existsByUsername(this.username).subscribe(exists => {
      this.hasProfile = exists;
      if (this.hasProfile) {
        this.router.navigate([`/portfolio/${this.username}`]);
        return false
      } else {
        return true;
      }
    })
    if (this.tokenService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }    
  }
  
}
