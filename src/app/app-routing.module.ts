import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneUtenteComponent } from './components/registrazione-utente/registrazione-utente.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { GestioneUtentiComponent } from './components/gestione-utenti/gestione-utenti.component';
import { PostViewComponent } from './components/post-view/post-view.component';

const routes: Routes = [
  {
    path : "registrazione-utente", 
    component : RegistrazioneUtenteComponent
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "post/:id",
    component : PostViewComponent
  },
  {
    path : "gestione-utenti",
    component : GestioneUtentiComponent
  },
  {
    path: '',
    redirectTo: 'registrazione-utente',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'registrazione-utente',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
