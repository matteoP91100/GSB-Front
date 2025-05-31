import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotedefraisService {
  private apiUrl = 'http://localhost:8080/api/fichefrais';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/all");
  }


  getNote(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addNote(item: any): Observable<any> {
    console.log("Ajout fiche frais:", JSON.stringify(item));
    return this.http.post<any>(this.apiUrl+"/save2", item).pipe(
      catchError(error => {
        console.error("Erreur lors de l'ajout de la fiche de frais", error);
        return throwError(() => new Error('Impossible d’ajouter la fiche de frais'));
      })
    );
  }
  updateNote(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getFichesAvecMinFraisForfait(mois: number) {
    return this.http.get<any[]>(`/api/fichesfrais?mois=${mois}&minFraisForfait=3`);
  }

  getFichesByMoisFiltrees(mois: number) {
    return this.http.get<any[]>(`${this.apiUrl}/mois/${mois}/filtrer`);
  }

  getFichesByMois(mois: number) {
    return this.http.get<any[]>(`${this.apiUrl}/mois/${mois}`);
  }

  getFichesParMoisEtDepartement(mois: number, departement: number){
    return this.http.get<any[]>(`${this.apiUrl}/mois/${mois}/departement?departement=${departement}`);
  }

  getFichesParMoisEtUser(mois: number, user: number){
    return this.http.get<any[]>(`${this.apiUrl}/mois/${mois}/user?user=${user}`);
  }

  getFichesParTrimestre(userId: number, trimestre: number) {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}/trimestre/${trimestre}`);
  }


}
