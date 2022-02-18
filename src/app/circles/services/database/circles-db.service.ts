import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICircle } from '../../circle-object/ICircle';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CirclesDbService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/circles';

  getData(): Observable<ICircle[]> {
    return this.http.get<ICircle[]>(this.apiUrl);
  }

  deleteCircle(circle: ICircle): Observable<ICircle> {
    const url = `${this.apiUrl}/${circle.id}`;
    return this.http.delete<ICircle>(url);
  }

  updateCircle(circle: ICircle): Observable<ICircle> {
    const url = `${this.apiUrl}/${circle.id}`;
    return this.http.put<ICircle>(url, circle, httpOptions);
  }

  addCircle(circle: ICircle): Observable<ICircle> {
    return this.http.post<ICircle>(this.apiUrl, circle, httpOptions);
  }

}
