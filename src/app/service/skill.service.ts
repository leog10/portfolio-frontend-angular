import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  private skillUrl = environment.skillURL;

  public list(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillUrl + 'list');
  }

  public delete(skill: Skill): Observable<Skill> {    
    return this.http.delete<Skill>(this.skillUrl + `delete/${skill.id}`);
  }

  public detailsByUsername(username: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillUrl + `details/${username}`);
  }

  public update(skill: Skill): Observable<Skill> {
    console.log(skill)
    return this.http.put<Skill>(this.skillUrl + `update/${skill.id}`, skill);
  }

  public create(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.skillUrl + 'create', skill);
  }
}
