import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICircle } from '../../circle-object/ICircle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CirclesDbService {

  constructor(private http: HttpClient) { }

  private skillUrl = environment.skillURL;

  getData(): Observable<ICircle[]> {
    return this.http.get<ICircle[]>(this.skillUrl);
  }

  deleteCircle(circle: ICircle): Observable<ICircle> {    
    return this.http.delete<ICircle>(this.skillUrl + `delete${circle.id}`);
  }

  updateCircle(circle: ICircle): Observable<ICircle> {    
    return this.http.put<ICircle>(this.skillUrl + `update${circle.id}`, circle);
  }

  addCircle(circle: ICircle): Observable<ICircle> {
    return this.http.post<ICircle>(this.skillUrl + 'create', circle);
  }

}
