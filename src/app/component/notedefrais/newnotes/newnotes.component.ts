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
   constructor(private fb: FormBuilder,private fraisH: FraishorsforfaitService, private notes: NotedefraisService, private ligneFrais: LigneFraisauforfaitService, private fraisF: FraisforfaitService) { // Injectez le service

   /* this.myForm = this.fb.group({
      rows: this.fb.array([]) // FormArray pour les lignes dynamiques*/

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
    Submit() {
      if (this.myForm.get('date')?.invalid || this.rows.controls.some(row => row.invalid)) {
        console.error('❌ Formulaire invalide.');
        this.errorMessage = 'Veuillez corriger les erreurs avant de soumettre.';
        return;
      }

      const ficheFraisData = {
        user: { "id": 2 },
        date: new Date().toISOString().split('T')[0],
        etat: { "id": 1 },
        montantValide: 4.3,
        nbJustif: 0
      };

      this.notes.addNote(ficheFraisData).subscribe({
        next: (ficheFrais) => {
          console.log("✅ FicheFrais créée avec succès :", ficheFrais);

          // 📌 Vérifier si le frais hors forfait est rempli AVANT de l'envoyer
          if (this.myForm.value.libelle && this.myForm.value.montantHF) {
            const fraishorsforfaitData = {
              date: this.myForm.value.date,
              libelle: this.myForm.value.libelle,
              montantHF: this.myForm.value.montantHF,
              ficheFrais: { id: ficheFrais.id }
            };

            console.log('📌 Frais hors forfait soumis:', fraishorsforfaitData);
            this.fraisH.addFraisH(fraishorsforfaitData).subscribe({
              next: (fraishorsForfait) => {
                console.log("✅ Frais hors forfait ajouté :", fraishorsForfait);
              }
            });
          }

          // 📌 Vérification des frais forfait
          const fraisForfaitFinal = this.myForm.value.rows.map((row: any) => ({
            type: row.type,
            montantF: row.montantF,
            ficheFrais: { id: ficheFrais.id }
          }));

          console.log('📌 Frais forfait soumis:', fraisForfaitFinal);

          // 📌 Vérifier si un montant dépasse 150€
          const montantDepasse = fraisForfaitFinal.some((frais: any) => frais.montantF > 150);

          if (montantDepasse) {
            console.error('❌ Un montant dépasse 150 euros, il doit être en frais hors forfait.');
            this.errorMessage = 'Un montant dépasse 150 euros, veuillez le mettre en frais hors forfait.';
            return;
          }

          // 📌 Ajouter les frais forfait
          console.log('✅ Montants valides, envoi des frais forfait...');
          this.fraisF.addFrais(fraisForfaitFinal).subscribe({
            next: (fraisForfait) => {
              console.log("✅ Frais forfait créé avec succès :", fraisForfait);
            },
            error: (err) => {
              console.error("❌ Erreur lors de l'envoi :", err);
            }
          });

          // 📌 Réinitialiser le formulaire
          this.myForm.reset();
        },
        error: (err) => {
          console.error("❌ Erreur lors de la création de la FicheFrais :", err);
        }
      });
    }
  }
