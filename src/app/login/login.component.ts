import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Optionnel : Utilisé si tu veux rediriger après la connexion
import { Observable } from 'rxjs'; // Pour gérer les requêtes HTTP

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Assure-toi que 'styleUrls' est au pluriel
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Initialiser le formulaire avec les champs requis
    this.form = this.fb.group({
      "email": ['', [Validators.required, Validators.email]],  // Validation email
      "password": ['', [Validators.required, Validators.minLength(6)]]  // Validation du mot de passe
    });
  }

  // Fonction pour envoyer les données au serveur
  sendDataToServer(formData: any): Observable<any> {
    const url = 'https://developpement.tech/back_end/connexion';  // URL de l'API pour se connecter
    return this.http.post(url, formData);  // Envoyer les données avec une requête POST
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit_login() {
    if (this.form.valid) {
      const formData = this.form.value;  // Récupérer les données du formulaire

      console.log('Données de connexion:', JSON.stringify(formData));

      // Envoyer les données au serveur
      this.sendDataToServer(formData).subscribe(
        response => {
          console.log('Réponse du serveur:', response);
          this.router.navigate(['/']);
          // Rediriger l'utilisateur ou gérer la réponse après connexion réussie
          // Exemple : this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Erreur lors de la connexion:', error);
          // Gérer les erreurs de connexion, afficher un message, etc.
        }
      );
    }
  }
}
