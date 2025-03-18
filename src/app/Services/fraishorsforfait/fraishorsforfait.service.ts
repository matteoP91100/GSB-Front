import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraishorsforfaitService {

  private apiUrl = 'http://localhost:8080/api/lignefraishorsforfaits';


    constructor(private http: HttpClient) {}

    getFraisHs(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    getFraisH(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }


    addFraisH(item: any): Observable<any> {
      console.log("Ajout ligne frais hors forfait:", JSON.stringify(item));
          return this.http.post<any>(this.apiUrl+"/save", item).pipe(
            catchError(error => {
              console.error("Erreur lors de l'ajout de la ligne de frais hors forfait", error);
              return throwError(() => new Error('Impossible d’ajouter la ligne de frais hors forfait'));
    })
  );
  }

    updateFraisH(id: number, item: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, item);
    }

    deleteFraisH(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
  }

