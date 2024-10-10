import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  probabilite: string = '';  // Pour stocker la probabilité
  avertissement: string = '';  // Pour stocker l'avertissement
  doctolibUrl: string = '';  // Pour stocker l'URL de Doctolib
  prediction: string = '';  // Pour stocker la prédiction

  constructor(private router: Router) {}

  ngOnInit(): void {
    // On récupère les données passées via la navigation
    const state = this.router.getCurrentNavigation()?.extras.state as { 
      probabilite: string, 
      avertissement: string, 
      doctolib_url: string,
      prediction : string
    };
  
    if (state) {
      // Si les données sont présentes, on les stocke
      this.probabilite = state.probabilite;
      this.avertissement = state.avertissement;
      this.doctolibUrl = state.doctolib_url;
      this.prediction = state.prediction;
    } else {
      // Si aucune donnée via la navigation, on les récupère de sessionStorage
      const resultData = sessionStorage.getItem('resultData');
      if (resultData) {
        const parsedData = JSON.parse(resultData);
        this.probabilite = parsedData.probabilite;
        this.avertissement = parsedData.avertissement;
        this.doctolibUrl = parsedData.doctolib_url;
        this.prediction = parsedData.prediction;
      } else {
        // Si aucune donnée n'est trouvée, rediriger l'utilisateur (par exemple vers la page d'accueil)
        console.error('Aucune donnée disponible. Redirection vers la page d\'accueil.');
        this.router.navigate(['/']);
      }
    }
  }
}  
