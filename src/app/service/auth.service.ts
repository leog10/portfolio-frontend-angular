import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = environment.authURL;

  constructor(private http: HttpClient) { }

  public new(newUser: NewUser): Observable<any> {
    return this.http.post<any>(this.authURL + 'new', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.authURL + 'login', loginUser)
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.authURL + 'refresh', dto);
  }
}
