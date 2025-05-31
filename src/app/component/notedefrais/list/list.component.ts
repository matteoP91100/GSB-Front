import { Component, OnInit } from '@angular/core';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FraisforfaitService } from '../../../Services/fraisforfait/fraisforfait.service';
import { LigneFraisauforfaitService } from '../../../Services/lignefraisauforfait/lignefraisauforfait.service';
import { FraishorsforfaitService } from '../../../Services/fraishorsforfait/fraishorsforfait.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ NgFor, CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  mois: number =0 ;
  ratio: number = 0;
  fichesFiltrees: any[] = [];
  fiche: any;
  mois1: number = 1; // Par défaut Janvier
mois2: number = 2; // Par défaut Février
departement: number = 0;
trimestre: number = 0;
userId: number = 0;

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

  trimestres = [
    {code: 1},
    {code: 2},
    {code: 3},
    {code: 4}
  ]

  users = [
    {code: 1},
    {code: 2},
    {code: 3},
    {code: 4},
    {code: 5}
  ]
  selectedUser = '';

  departements = [
    { code: 75},
    { code: 77},
    { code: 78},
    { code: 91},
    { code: 92},
    { code: 93},
    { code: 94},
    { code: 95}
  ];
  selectedDepartement = '';


  constructor(private route: ActivatedRoute, private fraisService: NotedefraisService, private fraisFService: FraisforfaitService, private ligneHService: FraishorsforfaitService) {}


  ngOnInit(): void {
    this.loadFiches();
  }
  onMonthChange() {
    this.loadFiches();
  }

  onUserChange(){
    this.loadFiches();
  }

  loadFiches() {
    this.fraisService.getFichesByMois(this.mois).subscribe({
      next: data => {
        this.fichesFiltrees = data;
        console.log("📄 Fiches récupérées :", data);
      },
      error: err => {
        console.error("❌ Erreur chargement fiches", err);
      }
    });
  }

  /*Affiche les fiches par trimestre (a finir)
  ngOnInit(): void {
    this.loadFichesParTrimestre();
  }
  onTrimChange() {
    this.loadFichesParTrimestre();
  }

  loadFichesParTrimestre() {
    this.fraisService.getFichesParTrimestre(this.userId, this.trimestre).subscribe({
      next: data => {
        this.fichesFiltrees = data;
        console.log("📄 Fiches du trimestre récupérées :", data);
      },
      error: err => {
        console.error("❌ Erreur chargement fiches trimestre", err);
      }
    });
  }
*/

/* Cette partie sert a afficher les fiches par departement et par mois et d'afficher le total
  ngOnInit(): void {
    this.chargerFiches();
  }

  onMonthChange() {
    this.chargerFiches();
  }
  onDepChange(){
    this.chargerFiches();
  }

  calculerSommeTotaleFiches(): number {
    return this.fichesFiltrees.reduce((somme: number, fiche: any) => {
      return somme + this.calculerTotal(fiche);
    }, 0);
  }

  chargerFiches() {
    this.fraisService.getFichesParMoisEtDepartement(this.mois, this.departement).subscribe({
      next: data => {
        this.fichesFiltrees = data;
        console.log("📄 Fiches récupérées :", data);
      },
      error: err => {
        console.error("❌ Erreur chargement fiches :", err);
      }
    });
  }
*/
/* Pour avoir les fiches de frais avec au moins 3 frais forfaits par mois
ngOnInit(): void {
    this.loadFiches();
  }
  onMonthChange() {
    this.loadFiches();
  }

  loadFiches() {
    this.fraisService.getFichesByMoisFiltrees(this.mois).subscribe({
      next: data => {
        this.fichesFiltrees = data;
        console.log("📄 Fiches récupérées :", data);
      },
      error: err => {
        console.error("❌ Erreur chargement fiches", err);
      }
    });
  }
*/

  /*fetchFichesAvecMinFraisForfait() {
    this.fraisService.getFichesAvecMinFraisForfait(this.mois).subscribe(data => {
      this.fichesFiltrees = data;
      console.log("Fiches filtrées pour le mois", this.mois, data);
    });
  }*/

 /* Pour avoir les forfaits par type
  getTotalFraisForfaitParType(): { [key: string]: number } {
    const totaux: { [key: string]: number } = {};

    this.fichesFiltrees.forEach(fiche => {
      fiche.fraisForfaits?.forEach((frais: any) => {
        if (!totaux[frais.type]) {
          totaux[frais.type] = 0;
        }
        totaux[frais.type] += frais.quantiteF * frais.montantF;
      });
    });

    return totaux;
  }
*/

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

  calculerTotal(fiche: any): number {
    let totalForfait = 0;
    let totalHorsForfait = 0;

    if (fiche?.fraisForfaits) {
      totalForfait = fiche.fraisForfaits.reduce((sum: number, frais: any) => {
        return sum + (frais.quantiteF * frais.montantF);
      }, 0);
    }

    if (fiche?.ligneFraisHorsForfaits) {
      totalHorsForfait = fiche.ligneFraisHorsForfaits.reduce((sum: number, frais: any) => {
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

  /*getUserCountWithThreeOrMoreFrais(): number {
    return this.fichesFiltrees.filter(fiche => fiche.fraisForfaits?.length >= 3).length;
  }*/

    /*Pour calculer le ratio entre les frais forfaits et les frais hors forfaits sur 2 mois
    ngOnInit() {
      this.mois1 = 1;
      this.mois2 = 2;
      this.loadFichesEtCalculRatio();
  }

  onMonthChange() {
    this.loadFichesEtCalculRatio();
  }

  loadFichesEtCalculRatio() {
    this.fraisService.getFichesByMois(this.mois1).subscribe(data1 => {
      console.log("📥 Données mois 1 :", data1);

      this.fraisService.getFichesByMois(this.mois2).subscribe(data2 => {
        console.log("📥 Données mois 2 :", data2);

        const totalForfait1 = this.calculerTotalForfaitPourToutesLesFiches(data1);
        const totalHorsForfait1 = this.calculerTotalHorsForfaitPourToutesLesFiches(data1);

        const totalForfait2 = this.calculerTotalForfaitPourToutesLesFiches(data2);
        const totalHorsForfait2 = this.calculerTotalHorsForfaitPourToutesLesFiches(data2);

        const totalFraisForfait = totalForfait1 + totalForfait2;
        const totalFraisHorsForfait = totalHorsForfait1 + totalHorsForfait2;

        this.ratio = this.calculateRatio(totalFraisForfait, totalFraisHorsForfait);

        console.log("📊 Ratio calculé :", this.ratio);
      });
    });
  }
  calculerTotalForfait(fiche: any): number {
    return fiche?.fraisForfaits?.reduce((sum: number, frais: any) => {
      return sum + (frais.quantiteF * frais.montantF);
    }, 0) || 0;
  }

  // Calculer les frais hors forfait
  calculerTotalHorsForfait(fiche: any): number {
    return fiche?.ligneFraisHorsForfaits?.reduce((sum: number, frais: any) => {
      return sum + frais.montantHF;
    }, 0) || 0;
  }
  calculerTotalForfaitPourToutesLesFiches(fiches: any[]): number {
    return fiches.reduce((total, fiche) => {
      return total + this.calculerTotalForfait(fiche);
    }, 0);
  }

  calculerTotalHorsForfaitPourToutesLesFiches(fiches: any[]): number {
    return fiches.reduce((total, fiche) => {
      return total + this.calculerTotalHorsForfait(fiche);
    }, 0);
  }

     // Méthode pour calculer le ratio
     calculateRatio(fraisForfait: number, fraisHorsForfait: number): number {
      return fraisHorsForfait === 0 ? 0 : fraisForfait / fraisHorsForfait;
    }
*/

}
