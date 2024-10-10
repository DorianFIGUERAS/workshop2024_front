import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';  // Importer le service Router



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'wcs';
  isLoggedIn: boolean = false;

  login() {
    this.isLoggedIn = true;
  }


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  logout() {
    this.isLoggedIn = false;
    this.http.get<any>('https://developpement.tech/back_end/logout').subscribe(
      response => {
        if (response.message) {
          console.log(response.message);
          this.router.navigate(['/']);  // Redirection vers la route '/'
        } else {
        }
      },
      error => {
        console.error('Erreur de chargement des données', error);
      }
    );
  }
}
