import { Component } from '@angular/core';
import { FraisauforfaitService } from '../../../Services/lignefraisauforfait/lignefraisauforfait.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent {
frais: any = {}
isEditMode = false;
id!: number;
constructor(
  private fraisauForfait: FraisauforfaitService,
  private route: ActivatedRoute,
  private router: Router
) {}
ngOnInit(): void {
  this.id = +this.route.snapshot.paramMap.get('id')!;
  if (this.id) {
    this.isEditMode = true;
    this.fraisauForfait.getFrais(this.id).subscribe((data) => {
      this.frais = data;
    });
  }
}

saveFrais() {
  if (this.isEditMode) {
    this.fraisauForfait.updateFrais(this.id, this.frais).subscribe(() => {
      //this.router.navigate(['/listnotes']);
    });
  } else {
    this.fraisauForfait.addFrais(this.frais).subscribe(() => {
      //this.router.navigate(['/']);
    });
  }
}
}
