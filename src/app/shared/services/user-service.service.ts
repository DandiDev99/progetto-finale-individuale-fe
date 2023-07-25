import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AuthenticationDto } from 'src/app/models/user/authentication-dto.model';
import { LoginUserDto } from 'src/app/models/user/login-user-dto.model';
import { RegistrationUserDto } from 'src/app/models/user/registration-model-dto.model';
import { UserOutputDto } from 'src/app/models/user/user-output-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  registra(registrationUserDto: RegistrationUserDto) : Observable<UserOutputDto> {
    return this.httpClient.post<UserOutputDto>(environment.endpoint + "/user/registration", registrationUserDto, {
      headers: {
        skip: "true"
      }
    });
  }

  login(loginUserDto : LoginUserDto) : Observable<AuthenticationDto> {
    return this.httpClient.post<AuthenticationDto>(environment.endpoint + "/user/login", loginUserDto, {
      headers : {
        skip : 'true'
      }
    });
  }

  getAll() : Observable<UserOutputDto[]>{
    return this.httpClient.get<UserOutputDto[]>(environment.endpoint + "/user/all");
  }

  ban(id : number){
    return this.httpClient.post(environment.endpoint + "/user/ban/" + id, null);
  }

  unban(id : number){
    return this.httpClient.post(environment.endpoint + "/user/unban/" + id, null);
  }

  delete(id : number){
    return this.httpClient.delete(environment.endpoint+"/user/"+id);
  }

  promote(id : number){
    return this.httpClient.post(environment.endpoint + '/user/promote/' + id, null);
  }

}
