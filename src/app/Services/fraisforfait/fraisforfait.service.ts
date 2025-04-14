import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraisforfaitService {
private apiUrl = 'http://localhost:8080/api/fraisforfaits';

    constructor(private readonly http: HttpClient) {}

    getFraiss(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    getFrais(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    addFrais(item: any): Observable<any> {
console.log("Ajout frais forfait:", JSON.stringify(item));
          return this.http.post<any>(this.apiUrl+"/save", item).pipe(
            catchError(error => {
              console.error("Erreur lors de l'ajout de frais  forfait", error);
              return throwError(() => new Error('Impossible  de frais  forfait'));
    })
  );    }

    updateFrais(id: number, item: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, item);
    }

    deleteFraisForfait(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
