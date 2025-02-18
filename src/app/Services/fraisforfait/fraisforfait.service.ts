import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraisforfaitService {
private readonly apiUrl = 'http://localhost:8080/api/fraisforfaits';

    constructor(private readonly http: HttpClient) {}

    getFraiss(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    getFrais(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    addFrais(item: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, JSON.stringify(item));
    }

    updateFrais(id: number, item: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, item);
    }

    deleteFrais(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
