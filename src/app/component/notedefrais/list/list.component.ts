import { Component, OnInit } from '@angular/core';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FraisforfaitService } from '../../../Services/fraisforfait/fraisforfait.service';
import { LigneFraisauforfaitService } from '../../../Services/lignefraisauforfait/lignefraisauforfait.service';
import { FraishorsforfaitService } from '../../../Services/fraishorsforfait/fraishorsforfait.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ NgFor, CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  mois: number =0 ;
  fiche: any;
  months: { value: number, name: string }[] = [
    { value: 1, name: 'Janvier' },
    { value: 2, name: 'Février' },
    { value: 3, name: 'Mars' },
    { value: 4, name: 'Avril' },
    { value: 5, name: 'Mai' },
    { value: 6, name: 'Juin' },
    { value: 7, name: 'Juillet' },
    { value: 8, name: 'Août' },
    { value: 9, name: 'Septembre' },
    { value: 10, name: 'Octobre' },
    { value: 11, name: 'Novembre' },
    { value: 12, name: 'Décembre' }
  ];
  constructor(private route: ActivatedRoute, private fraisService: NotedefraisService, private fraisFService: FraisforfaitService, private ligneHService: FraishorsforfaitService) {}

  ngOnInit() {
    // On initialise avec le mois actuel ou un mois par défaut
    this.mois = new Date().getMonth() + 1; // Mois actuel (les mois commencent à 0 en JavaScript)
    this.fetchFiche();
  }

  onMonthChange() {
    // Lors du changement du mois, on récupère les données de la fiche de frais
    this.fetchFiche();
  }

  fetchFiche() {
    this.fraisService.getNote(this.mois).subscribe(data => {
      this.fiche = data;
      console.log("mois actuel " + this.mois)
    });
  }
  getTarif(type: string): number {
    switch (type) {
      case 'Repas':
        return 29.00;
      case 'Hebergement':
        return 80.00;
      case 'Kilometrage':
        return 0.67;
      default:
        return 0; // valeur par défaut si type inconnu
    }
  }

  calculerTotal(): number {
    let totalForfait = 0;
    let totalHorsForfait = 0;

    if (this.fiche?.FraisForfaits) {
      totalForfait = this.fiche.FraisForfaits.reduce((sum: number, frais: any) => {
        return sum + (frais.quantiteF * this.getTarif(frais.type));
      }, 0);
    }

    if (this.fiche?.ligneFraisHorsForfaits) {
      totalHorsForfait = this.fiche.ligneFraisHorsForfaits.reduce((sum: number, frais:any) => {
        return sum + frais.montantHF;
      }, 0);
    }

    return totalForfait + totalHorsForfait;
  }

  deleteFraisForfait(index: number): void {
    const fraisToDelete = this.fiche.FraisForfaits[index];

    // Appel à un service backend pour supprimer le frais dans la base de données
    this.fraisFService.deleteFraisForfait(fraisToDelete.id).subscribe(response => {
      // En cas de succès, on retire l'élément de la liste
      this.fiche.FraisForfaits.splice(index, 1);
    }, error => {
      console.error('Erreur lors de la suppression du frais forfaitaire', error);
    });
  }
   // Fonction pour supprimer un frais hors forfait
   deleteFraisHorsForfait(index: number): void {
    const fraisToDelete = this.fiche.ligneFraisHorsForfaits[index];

    // Appel à un service backend pour supprimer le frais dans la base de données
    this.ligneHService.deleteFraisHorsForfait(fraisToDelete.id).subscribe(response => {
      // En cas de succès, on retire l'élément de la liste
      this.fiche.ligneFraisHorsForfaits.splice(index, 1);
    }, error => {
      console.error('Erreur lors de la suppression du frais hors forfait', error);
    });
  }
}
