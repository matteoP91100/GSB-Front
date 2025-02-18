import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraishorsforfaitService {

  private apiUrl = 'http://localhost:8080/api/lignefraishorsforfaits';

  protected get requestHeaders(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    });
    return { headers };
  }
    constructor(private http: HttpClient) {}

    getFraisHs(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    getFraisH(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }


    addFraisH(item: any): Observable<any> {
      console.log("test", item);
      return this.http.post<any>(this.apiUrl, item, this.requestHeaders);
    }

    updateFraisH(id: number, item: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, item);
    }

    deleteFraisH(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
  }

