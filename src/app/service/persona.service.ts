import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private personaURL = environment.personaURL;

  constructor(private http: HttpClient) { }

  public list(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.personaURL + 'list');
  }

  public create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.personaURL + 'create', persona);
  }

  public usernameByPersonaId(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.personaURL + `username/persona-id/${id}`);
  }

  public detailsByUsername(username: string): Observable<Persona> {
    return this.http.get<Persona>(this.personaURL + `details/${username}`);
  }

  public update(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.personaURL + `update/${id}`, persona);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.personaURL + `delete/${id}`);
  } 
  
  public updateImg(id: number, img: Object): Observable<Object> {
    return this.http.put<Object>(this.personaURL + `update/image/${id}`, img);
  }

  public existsByUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(this.personaURL + `exists/${username}`);
  }

  public getUsernameByEmail(email: string): Observable<any> {
    return this.http.get<any>(this.personaURL + `details/username/${email}`);
  }
}
