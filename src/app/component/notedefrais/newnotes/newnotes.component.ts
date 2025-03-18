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
        libelle: ['', Validators.required],
        montantHF: ['', [Validators.required, Validators.min(0)]],
        rows: this.fb.array([])
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
      if (this.myForm.valid) {
        // 1️⃣ Créer la FicheFrais en premier
        const ficheFraisData = {
          user: { "id": 2 }, // ID de l'utilisateur
          date: new Date().toISOString().split('T')[0], // Date actuelle
          etat: { "id": 1 }, // État par défaut
          montantValide: 4.3, // Initialisation
          nbJustif: 0
        };

        console.log("test ajout fiche" + JSON.stringify(ficheFraisData));

        this.notes.addNote(ficheFraisData).subscribe({
          next: (ficheFrais) => {
            console.log("✅ FicheFrais créée avec succès :", ficheFrais);

            // Récupération de l'ID de l'utilisateur
            const userId = ficheFrais.user.id;

            // 2️⃣ Ajouter Frais Hors Forfait avec l'ID de la fiche
            const fraishorsforfaitData = {
              date: this.myForm.value.date,
              libelle: this.myForm.value.libelle,
              montantHF: this.myForm.value.montantHF,
              ficheFrais: { id: ficheFrais.id } // Associer l'ID de la fiche
            };

            console.log('Frais hors forfait soumis:', fraishorsforfaitData);

            this.fraisH.addFraisH(fraishorsforfaitData).subscribe({
              next: (fraishorsForfait) => {
                console.log("✅ Frais hors forfait créé avec succès :", fraishorsForfait);
              }
            });

            // 3️⃣ Ajouter Frais Forfait avec l'ID de la fiche

            const fraisForfaitFinal = this.myForm.value.rows.map((row: any) => ({
              type: row.type,
              montantF: row.montantF
            }));
            console.log('Frais forfait soumis:', fraisForfaitFinal);

            this.fraisF.addFrais(fraisForfaitFinal).subscribe({
              next: (fraisForfait) => {
                console.log("✅ Frais forfait créé avec succès :", fraisForfait);

                // 4️⃣ Ajouter Ligne Frais Forfait avec l'ID de la fiche, l'ID des frais forfait et l'ID de l'utilisateur
                const ligneFraisForfaitData = {
                  ficheFrais: { id: ficheFrais.id }, // Associer à la fiche
                  fraisForfait: { id: fraisForfait.id }, // Associer aux frais forfait
                  user: { id: userId }, // Associer l'utilisateur
                  quantite: this.myForm.value.rows.length // Nombre de lignes
                };

                console.log('Ligne Frais Forfait soumis:', ligneFraisForfaitData);

                this.ligneFrais.addLigneFrais(ligneFraisForfaitData).subscribe({
                  next: (ligneFraisForfait) => {
                    console.log("✅ Ligne Frais Forfait créée avec succès :", ligneFraisForfait);
                  }
                });

              }
            });

          },
          error: (err) => {
            console.error("❌ Erreur lors de la création de la FicheFrais :", err);
          }
        });

      } else {
        console.log('Le formulaire est invalide.');
      }
    }
  }
