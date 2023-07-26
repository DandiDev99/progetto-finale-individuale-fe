import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrazioneUtenteComponent } from './components/registrazione-utente/registrazione-utente.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PostViewComponent } from './components/post-view/post-view.component';
import { GestioneUtentiComponent } from './components/gestione-utenti/gestione-utenti.component';
import { MyHttpInterceptor } from './shared/interceptor/http-interceptor';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RegistrazioneUtenteComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    GestioneUtentiComponent,
    PostViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    QuillModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    ToastModule,
    TabMenuModule,
    ButtonModule,
    AvatarModule,
    CardModule,
    TableModule,
    InputTextModule
  ],
  providers: [MessageService , {
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
