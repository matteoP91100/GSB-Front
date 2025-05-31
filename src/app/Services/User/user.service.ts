import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {

  }

  getVisiteursSansFraisHorsForfait(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/visiteurs/sansfrais`);
  }
}
