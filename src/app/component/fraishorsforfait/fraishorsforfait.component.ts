import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { FraishorsforfaitService } from '../../Services/fraishorsforfait/fraishorsforfait.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-fraishorsforfait',
    imports: [ ReactiveFormsModule, FormsModule, CommonModule ],
    templateUrl: './fraishorsforfait.component.html',
    styleUrl: './fraishorsforfait.component.css'
})
export class FraishorsforfaitComponent {
  myForm: FormGroup;
  libelles = [
    { value: 'libelle 1', label: 'Repas' },
    { value: 'libelle 2', label: 'Kilometrage' },
    { value: 'libelle 3', label: 'Hebergement' },
  ];
  constructor(private fraisH: FraishorsforfaitService) { // Injectez le service
    this.myForm = new FormGroup({
      libelle: new FormControl(''),
       // Champ titre
      date: new FormControl(''),
      montant: new FormControl('') // Champ description
    });
  }
  onSubmit() {
      if (this.myForm.valid) {
        const fraisH = this.myForm.value; // Récupère les données du formulaire sous forme d'objet
        const finalfraisH= JSON.stringify(fraisH);
        this.fraisH.addFraisH(finalfraisH).subscribe({
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
