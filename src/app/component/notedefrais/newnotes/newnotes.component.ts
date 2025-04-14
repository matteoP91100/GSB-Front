import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';
import { FraishorsforfaitService } from '../../../Services/fraishorsforfait/fraishorsforfait.service';
import { LigneFraisauforfaitService } from '../../../Services/lignefraisauforfait/lignefraisauforfait.service';
import { FraisforfaitService } from '../../../Services/fraisforfait/fraisforfait.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
    selector: 'app-newnotes',
    standalone:true,
    imports: [ReactiveFormsModule, NgFor, CommonModule, ],
    templateUrl: './newnotes.component.html',
    styleUrl: './newnotes.component.css'
})
export class NewnotesComponent {

 myForm: FormGroup;
   types = [
     { value: 'Repas', label: 'Repas' },
     { value: 'Kilometrage', label: 'Kilometrage' },
     { value: 'Hebergement', label: 'Hebergement' },
     { value: 'Relais étape', label: 'Relais étape' },
   ];

   libelles = [
    { value: 'Repas', label: 'Repas' },
    { value: 'Kilometrage', label: 'Kilometrage' },
    { value: 'Hebergement', label: 'Hebergement' },
    { value: 'Achat de fourniture', label: 'Achat de fourniture' },
    { value: 'Réservation de salle', label: 'Réservation de salle' },

  ];

minDate: string;
maxDate: string;


  // ... ton form builder ici


   constructor(private fb: FormBuilder,private fraisH: FraishorsforfaitService, private notes: NotedefraisService, private ligneFrais: LigneFraisauforfaitService, private fraisF: FraisforfaitService) { // Injectez le service

   /* this.myForm = this.fb.group({
      rows: this.fb.array([]) // FormArray pour les lignes dynamiques*/
      const today = new Date();

      const max = new Date(today.getFullYear(), today.getMonth()); // Mois en cours
      const min = new Date(today.getFullYear() - 1, today.getMonth()); // Même mois l'année dernière

      this.maxDate = max.toISOString().slice(0, 7); // format YYYY-MM
      this.minDate = min.toISOString().slice(0, 7);


      this.myForm = this.fb.group({
        date: ['', Validators.required],
        libelle: [''],
        montantHF: [''],
        rows: this.fb.array([])
      });

  }
  errorMessage: string | null = null;
    // Accès rapide à FormArray
    get rows() {
      return this.myForm.get('rows') as FormArray;
    }

    // Ajouter une nouvelle ligne
    addRow() {
      const row = this.fb.group({
        type: ['', [Validators.required, Validators.min(1)]],
        montantF: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
        quantiteF: ['', [Validators.required, Validators.min(1)]]
        // Exemple avec validation
      });
      this.rows.push(row);
      console.log('Nouvelle ligne ajoutée', this.rows.value);
      return this.rows.value

    }

    // Soumettre le formulaire
    submitForm() {
      console.log('Formulaire soumis',this.myForm.value); // Affiche les données dans la console
    }

    // Supprimer une ligne
    removeRow(index: number) {
      this.rows.removeAt(index);
    }

    lierDonneesAFiche(ficheFraisId: number) {
      if (this.myForm.value.libelle && this.myForm.value.montantHF) {
        const fraishorsforfaitData = {
          date: this.myForm.value.date,
          libelle: this.myForm.value.libelle,
          montantHF: this.myForm.value.montantHF,
          ficheFrais: { id: ficheFraisId }
        };

        this.fraisH.addFraisH(fraishorsforfaitData).subscribe({
          next: (fraishorsForfait) => {
            console.log("✅ Frais hors forfait ajouté :", fraishorsForfait);
          }
        });
      }

      const fraisForfaitFinal = this.myForm.value.rows.map((row: any) => ({
        type: row.type,
        montantF: row.montantF,
        quantiteF: row.quantiteF,
        ficheFrais: { id: ficheFraisId }
      }));

      const montantDepasse = fraisForfaitFinal.some((frais: any) => frais.montantF > 150);

      if (montantDepasse) {
        console.error('❌ Un montant dépasse 150€, il doit être en frais hors forfait.');
        this.errorMessage = 'Un montant dépasse 150€, veuillez le mettre en frais hors forfait.';
        return;
      }

      this.fraisF.addFrais(fraisForfaitFinal).subscribe({
        next: (fraisForfait) => {
          console.log("✅ Frais forfait créés :", fraisForfait);
        },
        error: (err) => {
          console.error("❌ Erreur ajout frais forfait :", err);
        }
      });

    }

    Submit() {
      if (this.myForm.get('date')?.invalid || this.rows.controls.some(row => row.invalid)) {
        console.error('❌ Formulaire invalide.');
        this.errorMessage = 'Veuillez corriger les erreurs avant de soumettre.';
        return;
      }

      const selectedDate = new Date(this.myForm.value.date);
      const ficheFraisId = selectedDate.getMonth() + 1; // Janvier = 0 donc on ajoute 1

      // Vérifie si une fiche existe déjà
      this.notes.getNote(ficheFraisId).subscribe({
        next: (ficheExistante) => {
          console.log("📄 Fiche de frais existante trouvée :", ficheExistante);
          this.lierDonneesAFiche(ficheExistante.id); // Utilise fiche existante
        },
        error: (err) => {
          if (err.status === 404) {
            console.log("🔄 Aucune fiche trouvée, création d'une nouvelle.");
            const ficheFraisData = {
              id: ficheFraisId,
              user: { id: 2 },
              date: selectedDate.toISOString().split('T')[0],
              etat: { id: 1 },
              montantValide: 0,
              nbJustif: 0
            };

            this.notes.addNote(ficheFraisData).subscribe({
              next: (nouvelleFiche) => {
                console.log("✅ Nouvelle fiche créée :", nouvelleFiche);
                this.lierDonneesAFiche(nouvelleFiche.id);
              },
              error: (err) => {
                console.error("❌ Erreur création fiche :", err);
              }
            });
          } else {
            console.error("❌ Erreur recherche fiche :", err);
          }
        }
      });
    }

  }
