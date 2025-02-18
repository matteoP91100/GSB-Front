import { Component, OnInit } from '@angular/core';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  items: any[] = [];

  constructor(private notedefraisService: NotedefraisService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes() {
    this.notedefraisService.getNotes().subscribe((data) => {
      this.items = data;
    });
}
}
