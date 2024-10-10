import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ResultsComponent} from './results/results.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apropos', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'resultat', component: ResultsComponent },
  { path: '**', redirectTo: '/about' } // Redirige les routes inconnues vers la page "À propos"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
