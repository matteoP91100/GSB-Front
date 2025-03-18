import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LigneFraisauforfaitService {
private apiUrl = 'http://localhost:8080/api/lignefraisforfaits';


    constructor(private http: HttpClient) {}

    getLigneFraiss(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    getLigneFrais(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    addLigneFrais(item: any): Observable<any> {
      console.log("Ajout ligne frais forfait:", JSON.stringify(item));
      return this.http.post<any>(this.apiUrl+"/save", item);
    }

    updateLigneFrais(id: number, item: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, item);
    }

    deleteLigneFrais(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
  }
