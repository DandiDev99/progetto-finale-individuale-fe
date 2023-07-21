import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneUtenteComponent } from './components/registrazione-utente/registrazione-utente.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

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
