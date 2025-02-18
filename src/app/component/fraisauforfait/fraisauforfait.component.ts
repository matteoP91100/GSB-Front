import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LigneFraisauforfaitService } from '../../Services/lignefraisauforfait/lignefraisauforfait.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-fraisauforfait',
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './fraisauforfait.component.html',
    styleUrl: './fraisauforfait.component.css'
})
export class FraisauforfaitComponent {
myForm: FormGroup;
  libelles = [
    { value: 'libelle 1', label: 'Repas' },
    { value: 'libelle 2', label: 'Kilometrage' },
    { value: 'libelle 3', label: 'Hebergement' },
  ];
  constructor(private frais: LigneFraisauforfaitService) { // Injectez le service
    this.myForm = new FormGroup({
      libelle: new FormControl(''),
       // Champ titre
      date: new FormControl(''),
      montant: new FormControl('') // Champ description
    });
  }
  onSubmit() {
      if (this.myForm.valid) {
        const frais = this.myForm.value; // Récupère les données du formulaire sous forme d'objet
        const finalfrais= JSON.stringify(frais);
        this.frais.addLigneFrais(finalfrais).subscribe({
          next: (response) => {
            console.log('Note ajoutée avec succès :', response);
            // Ajoutez une logique pour afficher une notification ou réinitialiser le formulaire
            this.myForm.reset();
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout de la note :', err);
            // Gérer les erreurs (par exemple, afficher un message d'erreur)
          }
        });
      } else {
        console.warn('Le formulaire est invalide');
      }
    }
}
