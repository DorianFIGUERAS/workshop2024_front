import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';  // Optionnel : Utilisé pour typer les observables
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Note the change to styleUrls instead of styleUrl
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Validation pour un email valide
      password: ['', [Validators.required, Validators.minLength(6)]]  // Mot de passe avec longueur minimale de 6 caractères
    });
  }

  // Fonction pour envoyer les données au serveur distant
  sendDataToServer(formData: any): Observable<any> {
    const url = 'https://developpement.tech/back_end/create_user';  // URL du serveur distant
    return this.http.post(url, formData);  // Envoi des données avec une requête POST
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      console.log('Données à envoyer au serveur:', JSON.stringify(formData));

      // Appeler la fonction pour envoyer les données au serveur
      this.sendDataToServer(formData).subscribe(
        response => {
          console.log('Réponse du serveur:', response);
          this.router.navigate(['/']);
          // Tu peux ici rediriger ou afficher un message de succès
        },
        error => {
          console.error('Erreur lors de l\'envoi des données:', error);
          // Gérer les erreurs d'envoi ici
        }
      );
    } else {
      console.log('Le formulaire est invalide');
    }
  }
}
