import { Component, Input } from '@angular/core';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';
import { Router } from 'express';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input () id!: number;

  constructor(private notedefraisService: NotedefraisService, private routerlink: RouterLink) {}

  deleteItem() {
    this.notedefraisService.deleteNote(this.id).subscribe(() => {
      //this.routerlink.navigate(['/']);
    });
}
}
