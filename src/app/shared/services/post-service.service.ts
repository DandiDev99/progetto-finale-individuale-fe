import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { OutputPostDto } from 'src/app/models/post/output-post-dto.model';
import { RegistrationPostDto } from 'src/app/models/post/registration-post-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<OutputPostDto[]>{
    return this.httpClient.get<OutputPostDto[]>(environment.endpoint + '/post');
  }

  getById(id : number) : Observable<OutputPostDto>{
    return this.httpClient.get<OutputPostDto>(environment.endpoint + '/post/' + id);
  }

  create(input : RegistrationPostDto) : Observable<OutputPostDto>{
    return this.httpClient.post<OutputPostDto>(environment.endpoint + '/post', input);
  }

}
