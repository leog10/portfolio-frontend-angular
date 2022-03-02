import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private experienceURL = environment.experienceURL;

  constructor(private http: HttpClient) { }

  public create(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.experienceURL + 'create', experience);
  }

  public detailsId(id: number): Observable<Experience> {
    return this.http.get<Experience>(this.experienceURL + `details/id/${id}`);
  }

  public detailsByUsername(username: string): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.experienceURL + `details/${username}`);
  }

  public update(id: number, experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(this.experienceURL + `update/${id}`, experience);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.experienceURL + `delete/${id}`);
  }
}
