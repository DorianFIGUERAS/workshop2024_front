import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],  // Importation de CommonModule pour utiliser les pipes et autres directives Angular
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyData: any[] = [];  // Initialise avec un tableau vide
  noResults: boolean = false;  // Indicateur pour gérer l'absence de résultats

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('https://developpement.tech/back_end/resultats').subscribe(
      response => {
        if (response.resultats && response.resultats.length > 0) {
          this.historyData = response.resultats;
          this.noResults = false;
        } else {
          this.noResults = true;
        }
      },
      error => {
        console.error('Erreur de chargement des données', error);
      }
    );
  }
}
