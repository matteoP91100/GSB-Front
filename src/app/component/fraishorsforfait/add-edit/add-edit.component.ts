
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FraishorsforfaitService } from '../../../Services/fraishorsforfait/fraishorsforfait.service';
import { Router } from 'express';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent implements OnInit {
frais: any = {}
isEditMode = false;
id!: number;
constructor(
  private fraisH: FraishorsforfaitService,
  private route: ActivatedRoute,
  private router: Router
) {}
ngOnInit(): void {
  this.id = +this.route.snapshot.paramMap.get('id')!;
  if (this.id) {
    this.isEditMode = true;
    this.fraisH.getFraisH(this.id).subscribe((data) => {
      this.frais = data;
    });
  }
}

saveFraisH() {
  if (this.isEditMode) {
    this.fraisH.updateFraisH(this.id, this.frais).subscribe(() => {
      //this.router.navigate(['/listnotes']);
    });
  } else {
    this.fraisH.addFraisH(this.frais).subscribe(() => {
      //this.router.navigate(['/']);
    });
  }
}
}
