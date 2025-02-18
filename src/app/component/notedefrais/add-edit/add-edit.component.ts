import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';
import { Router } from 'express';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent implements OnInit {
note: any = {}
isEditMode = false;
id!: number;
constructor(
  private notedefraisService: NotedefraisService,
  private route: ActivatedRoute,
  private router: Router
) {}
ngOnInit(): void {
  this.id = +this.route.snapshot.paramMap.get('id')!;
  if (this.id) {
    this.isEditMode = true;
    this.notedefraisService.getNote(this.id).subscribe((data) => {
      this.note = data;
    });
  }
}

saveNote() {
  if (this.isEditMode) {
    this.notedefraisService.updateNote(this.id, this.note).subscribe(() => {
      //this.router.navigate(['/listnotes']);
    });
  } else {
    this.notedefraisService.addNote(this.note).subscribe(() => {
      //this.router.navigate(['/']);
    });
  }
}
}
