import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonaService } from '../service/persona.service';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {

  constructor(     
    private personaService: PersonaService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      const param = route.params['username']      

      this.personaService.existsByUsername(param).subscribe(exists => {
            const routeHasProfile = exists;

            if (!routeHasProfile && this.tokenService.isLogged()) {
              // CAMBIAR POR PAGINA 404
              window.location.href = `${window.location.origin}/new`;              
              return;
            }
            if (!routeHasProfile && !this.tokenService.isLogged()) {
              // CAMBIAR POR PAGINA 404
              window.location.href = `${window.location.origin}/login`;              
              return;
            } 
          });
          return true;    
  }
  
}
