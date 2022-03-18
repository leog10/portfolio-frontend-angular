import { HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { JwtDTO } from '../models/jwt-dto';
const AUTHORIZATION = 'Authorization';  // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private tokenService: TokenService, private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/signin') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(() => (error.error.mensaje));
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());      
      if (dto)
        return this.authService.refresh(dto).pipe(
          switchMap((data: any) => {
            this.isRefreshing = false;
            this.tokenService.setToken(data.token);
            this.refreshTokenSubject.next(data.token);
            
            return next.handle(this.addTokenHeader(request, data.token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            
            this.tokenService.interceptorLogOut();
            return throwError(() => (err.error.mensaje));
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    return request.clone({ headers: request.headers.set(AUTHORIZATION, 'Bearer ' + token) });
    /* for Node.js Express back-end */
    //return request.clone({ headers: request.headers.set(AUTHORIZATION, token) });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
