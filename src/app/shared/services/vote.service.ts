import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { InputVoteDto } from 'src/app/models/vote/input-vote-dto.model';
import { OutputVoteDto } from 'src/app/models/vote/output-vote-dto.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient) { }

  voted(idPost : number) : Observable<OutputVoteDto>{
    return this.httpClient.get<OutputVoteDto>(environment.endpoint + "/vote/" + idPost);
  }

  vote(input : InputVoteDto): Observable<OutputVoteDto>{
    return this.httpClient.post<OutputVoteDto>(environment.endpoint + "/vote", input);
  }

  delete(idPost : number){
    return this.httpClient.post(environment.endpoint + '/vote/delete/' + idPost, null);
  } 
  
  update(input : InputVoteDto): Observable<OutputVoteDto>{
    return this.httpClient.post<OutputVoteDto>(environment.endpoint + "/vote/update", input);
  }

}
