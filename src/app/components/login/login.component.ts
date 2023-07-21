import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationDto } from 'src/app/models/user/authentication-dto.model';
import { LoginUserDto } from 'src/app/models/user/login-user-dto.model';
import { UserService } from 'src/app/shared/services/user-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin : FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private messageService : MessageService, private router: Router){
    this.formLogin = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  getRequiredErrorMessage(field : string) : string {
    return this.formLogin.controls[field].hasError('required') ? 'Inserisci un valore' : '';
  }

  login(){
    let user : LoginUserDto = {
      username : this.formLogin.controls["username"].value,
      password : this.formLogin.controls['password'].value
    };
    this.userService.login(user).subscribe({
      next : (u : AuthenticationDto) => {
        console.log(u);
        this.showSuccessMessage();
        this.formLogin.reset();
        this.formLogin.controls["username"].setErrors(null);
        this.formLogin.controls["password"].setErrors(null);
        localStorage.setItem("JWT", u.jwt);
        localStorage.setItem("USER_ID", u.user.id+"");
        this.router.navigateByUrl("/home");
      },
      error : (err : HttpErrorResponse) => {
        this.showErrorMessage(err.error.message);
        this.formLogin.reset();
      }
    });
  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login eseguito correttamente' });
  }
  showErrorMessage(message : string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

}
