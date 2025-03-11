import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intern } from './intern.model';

@Injectable({
  providedIn: 'root'
})
export class InternService {
  private apiUrl = 'http://localhost:7072/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getInterns(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }

  getIntern(id: number): Observable<Intern> {
    return this.http.get<Intern>(`${this.apiUrl}/get/${id}`, this.httpOptions);
  }

  addIntern(intern: Intern): Observable<Intern> {
    return this.http.post<Intern>(`${this.apiUrl}/add`, intern, this.httpOptions);
  }

  updateIntern(id: number, intern: Intern): Observable<Intern> {
    return this.http.put<Intern>(`${this.apiUrl}/update/${id}`, intern, this.httpOptions);
  }

  deleteIntern(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, this.httpOptions);
  }
}