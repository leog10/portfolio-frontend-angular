import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PersonaService } from '../service/persona.service';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {

  constructor(     
    private personaService: PersonaService,
    private tokenService: TokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      const param = route.params['username']      

      this.personaService.existsByUsername(param).subscribe(exists => {
            const routeHasProfile = exists;

            const username = this.tokenService.getUserName();

            if (route.paramMap.get('username') === username && !routeHasProfile) {
              window.location.href = `${window.location.origin}/new`;              
              return false;
            }            

            if (!routeHasProfile) {
              // PAGINA 404
              window.location.href = `${window.location.origin}/404`;              
              return false;
            }

            if (this.router.url.includes('portfolio') || this.router.url.includes(username)) {
              return true;
            } else {              
              this.router.navigate([`/portfolio/${param}`]);              
              return true;
            }
            
          });
          return true;
  }
  
}
