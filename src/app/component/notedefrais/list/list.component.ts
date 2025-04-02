import { Component, OnInit } from '@angular/core';
import { NotedefraisService } from '../../../Services/notedefrais/notedefrais.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ NgFor, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  fichesFrais: any[] = [];

  constructor(private notedeFraisService: NotedefraisService) {}

  ngOnInit(): void {
    this.notedeFraisService.getNotes().subscribe((data) => {
      this.fichesFrais = data;
    });
  }
}
