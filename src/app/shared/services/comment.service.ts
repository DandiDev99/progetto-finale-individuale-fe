import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { InputCommentDto } from 'src/app/models/comment/input-comment-dto.model';
import { OutputCommentDto } from 'src/app/models/comment/output-comment-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient : HttpClient) { }

  commenta(input : InputCommentDto) : Observable<OutputCommentDto>{
    return this.httpClient.post<OutputCommentDto>(environment.endpoint+"/comment",input);
  }

}
