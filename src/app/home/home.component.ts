import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';  // Optionnel : Utilisé pour typer les observables


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form: FormGroup;
  userRegion: string = ''; // Variable to store the user's region

  constructor(private router: Router,private fb: FormBuilder, private http: HttpClient) {
    
    this.form = this.fb.group({
      "Age": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "BMI": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "Glucose": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "Insulin": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "HOMA": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "Leptin": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "Adiponectin": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "Resistin": ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      "MCP-1": ['', Validators.required]
    });
    // Call function to get user's region
    this.getUserRegion();
  }

  // Function to get the user's region based on IP
  getUserRegion() {
    this.http.get<any>('https://ipapi.co/json/')  // Using ipapi.co to get IP info
      .subscribe(response => {
        this.userRegion = response.region; // Get the region from the response
        console.log('User region:', this.userRegion);
      }, error => {
        console.error('Error fetching IP info:', error);
        this.userRegion = 'Unknown';  // Fallback if there's an error
      });
  }

  // Fonction pour envoyer les données au serveur distant
  sendDataToServer(formData: any): Observable<any> {
    const url = 'https://developpement.tech/back_end/data';  // URL du serveur distant
    return this.http.post(url, formData);  // Envoi des données avec une requête POST
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      formData.region = this.userRegion;  // Ajouter la région au JSON à soumettre
  
      console.log('Données à envoyer au serveur:', JSON.stringify(formData));
  
      // Appeler la fonction pour envoyer les données au serveur
      this.sendDataToServer(formData).subscribe(
        response => {
          console.log('Réponse du serveur:', response);
  
          // Stocker les données dans sessionStorage
          sessionStorage.setItem('resultData', JSON.stringify(response));
  
          // Redirection vers la page de résultats
          this.router.navigate(['/resultat']);
        },
        error => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      );
    }
  }
}
