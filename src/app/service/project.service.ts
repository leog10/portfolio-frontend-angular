import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectURL = environment.projectURL;

  constructor(private http: HttpClient) { }

  public create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectURL + 'create', project);
  }

  public detailsId(id: number): Observable<Project> {
    return this.http.get<Project>(this.projectURL + `details/id/${id}`);
  }

  public detailsByUsername(username: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectURL + `details/${username}`);
  }

  public update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(this.projectURL + `update/${id}`, project);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.projectURL + `delete/${id}`);
  }
}
