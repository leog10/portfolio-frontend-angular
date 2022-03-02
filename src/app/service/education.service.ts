import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private educationURL = environment.educationURL;

  constructor(private http: HttpClient) { }

  public create(education: Education): Observable<Education> {
    return this.http.post<Education>(this.educationURL + 'create', education);
  }

  public detailsId(id: number): Observable<Education> {
    return this.http.get<Education>(this.educationURL + `details/id/${id}`);
  }

  public detailsByUsername(username: string): Observable<Education[]> {
    return this.http.get<Education[]>(this.educationURL + `details/${username}`);
  }

  public update(id: number, education: Education): Observable<Education> {
    return this.http.put<Education>(this.educationURL + `update/${id}`, education);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.educationURL + `delete/${id}`);
  }
}
