import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RegistrationUserDto } from 'src/app/models/user/registration-model-dto.model';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';
import { UserService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-registrazione-utente',
  templateUrl: './registrazione-utente.component.html',
  styleUrls: ['./registrazione-utente.component.css']
})
export class RegistrazioneUtenteComponent {

  formRegistrazione : FormGroup;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private messageService : MessageService){
    this.formRegistrazione = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required])
    });
  }

  getRequiredErrorMessage(field : string) : string {
    return this.formRegistrazione.controls[field].hasError('required') ? 'Inserisci un valore' : '';
  }

  getEmailErrorMessage() : string {
    if(this.formRegistrazione.controls["email"].hasError('required')) {
      return 'Inserisci un valore';
    }
    return this.formRegistrazione.controls["email"].hasError('email') ? 'Email non valida' : '';
  }

  registra(){
    let user : RegistrationUserDto = {
      firstName : this.formRegistrazione.controls["nome"].value,
      lastName : this.formRegistrazione.controls["cognome"].value,
      email : this.formRegistrazione.controls["email"].value,
      username : this.formRegistrazione.controls["username"].value
    };
    this.userService.registra(user).subscribe({
      next : (u : UserOutputDto) => {
        this.messageService.add({severity : 'info', summary : 'Info' ,detail : 'Controlla la posta elettronica per vedere la password temporanea'});
        this.messageService.add({severity : 'success', summary : 'Success' ,detail : 'Registrazione effettuata con successo!'});
      },
      error : (err : HttpErrorResponse) => this.messageService.add({severity : 'error', summary : 'Errore', detail : err.error.message})
    });
    this.formRegistrazione.reset();
    this.formRegistrazione.clearValidators();
  }

}
