import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';
import { FraishorsforfaitService } from '../../../Services/fraishorsforfait/fraishorsforfait.service';
import { LigneFraisauforfaitService } from '../../../Services/lignefraisauforfait/lignefraisauforfait.service';
import { FraisforfaitService } from '../../../Services/fraisforfait/fraisforfait.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-newnotes',
    standalone:true,
    imports: [ReactiveFormsModule, NgFor, CommonModule,HttpClientModule],
    templateUrl: './newnotes.component.html',
    styleUrl: './newnotes.component.css'
})
export class NewnotesComponent {

  ligneFraisForfait: FormGroup;
 ligneFraisHorsForfait: FormGroup;
 fraisForfait: FormGroup;
 myForm: FormGroup;
   types = [
     { value: 'type 1', label: 'Repas' },
     { value: 'type 2', label: 'Kilometrage' },
     { value: 'type 3', label: 'Hebergement' },
     { value: 'type 4', label: 'Relais étape' },
   ];

   libelles = [
    { value: 'type 1', label: 'Repas' },
    { value: 'type 2', label: 'Kilometrage' },
    { value: 'type 3', label: 'Hebergement' },
    { value: 'type 4', label: 'Achat de fourniture' },
    { value: 'type 5', label: 'Réservation de salle' },

  ];
   constructor(private fb: FormBuilder,private fraisH: FraishorsforfaitService, private notes: NotedefraisService, private ligneFrais: LigneFraisauforfaitService, private fraisF: FraisforfaitService) { // Injectez le service

    this.myForm = this.fb.group({
      rows: this.fb.array([]) // FormArray pour les lignes dynamiques
    });
    this.ligneFraisForfait = new FormGroup({
      quantite: new FormControl('')
    });
    this.ligneFraisHorsForfait = new FormGroup({
       libelle: new FormControl(''),
       date: new FormControl(''),
      montantHF: new FormControl('')
    });
    this.fraisForfait = new FormGroup({
      type: new FormControl(''),
      montantF: new FormControl('') // Champ description

   });

  }
    // Accès rapide à FormArray
    get rows() {
      return this.myForm.get('rows') as FormArray;
    }

    // Ajouter une nouvelle ligne
    addRow() {
      const row = this.fb.group({
        type: ['', [Validators.required, Validators.min(1)]],
        montantF: ['', [Validators.required, Validators.min(1)]],
        // Exemple avec validation
      });
      this.rows.push(row);
      console.log('Nouvelle ligne ajoutée', this.myForm.value);
      return this.myForm.value

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
      // Vérifier que tous les formulaires sont valides
      if (this.ligneFraisHorsForfait.valid || this.fraisForfait.valid) {

        // 1️⃣ Créer la FicheFrais en premier
        const ficheFraisData = {
          user: 1,
          date: new Date().toISOString().split('T')[0], // Date actuelle
          etat: 1, // Exemple d’état
          montantValide: 0, // Initialisation
          nbJustif:0
        };
console.log("test ajout fiche"+JSON.stringify(ficheFraisData))
        this.notes.addNote(ficheFraisData).subscribe({
          next: (ficheFrais) => {
            console.log("✅ FicheFrais créée avec succès :", ficheFrais);

            const ficheFraisId = ficheFrais.id; // Récupérer l'ID

            // 2️⃣ Ajouter les Lignes de Frais Forfait avec la FicheFrais associée
            const rowsCount: number = this.rows.length;
            const ligneFraisForfaitPayload = {
              quantite: rowsCount,
              ficheFrais: { id: ficheFraisId }, // Associer à la FicheFrais créée
            };

            this.ligneFrais.addLigneFrais(ligneFraisForfaitPayload).subscribe({
              next: (response) => {
                console.log("✅ LigneFraisForfait ajoutée :", response);
              },
              error: (err) => {
                console.error("❌ Erreur ajout LigneFraisForfait :", err);
              }
            });

            // 3️⃣ Ajouter les Frais Hors Forfait avec la FicheFrais associée
            const fraisHorsForfaitData = {
              ...this.ligneFraisHorsForfait.value,
              ficheFrais: { id: ficheFraisId }, // Associer la FicheFrais
            };

            this.fraisH.addFraisH(fraisHorsForfaitData).subscribe({
              next: (response) => {
                console.log("✅ FraisHorsForfait ajouté :", response);
                this.ligneFraisHorsForfait.reset();
              },
              error: (err) => {
                console.error("❌ Erreur ajout FraisHorsForfait :", err);
              }
            });

          },
          error: (err) => {
            console.error("❌ Erreur création FicheFrais :", err);
          }
        });

      } else {
        console.warn("⚠️ Aucun formulaire valide pour l'envoi.");
      }
    }

}
