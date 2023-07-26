import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OutputPostDto } from 'src/app/models/post/output-post-dto.model';
import { OutputVoteDto } from 'src/app/models/vote/output-vote-dto.model';
import { CommentService } from 'src/app/shared/services/comment.service';
import { PostService } from 'src/app/shared/services/post-service.service';
import { VoteService } from 'src/app/shared/services/vote.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit{

  post !: OutputPostDto;
  id !: number;
  vote ?: OutputVoteDto;
  formCommento : FormGroup;

  constructor(private postService : PostService, private activeRoute: ActivatedRoute, private voteService : VoteService, private messageService : MessageService, private formBuilder : FormBuilder, private commentService : CommentService){
    this.formCommento = this.formBuilder.group({
      newComment: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      params => {
        let temp = params.get('id')
        if(temp!== null){
          this.id = parseInt(temp)
        }
      });

    this.refreshPost();
    let userId = localStorage.getItem("USER_ID");
    if(userId !== null){
      this.voteService.voted(this.id).subscribe({
        next : (v : OutputVoteDto) => this.vote = v,
        error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)    
      })
    }
  }

  likeFlag() : boolean | null{
    if(this.vote != null){
      return this.vote.liked
    }
    return null;
  }

  like(){
    if(this.vote !== undefined){
      this.voteService.update({like : true, idPost: this.id}).subscribe({
        next : v => this.vote = v,
        error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
      });
    }else{
      this.voteService.vote({like : true, idPost : this.id}).subscribe({
        next : v => this.vote = v,
        error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
      });
    }
    
  }

  dislike(){
    if(this.vote != undefined){
      this.voteService.update({like : false, idPost: this.id}).subscribe({
        next : v => this.vote = v,
        error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
      });
    }else{
      this.voteService.vote({like : false, idPost : this.id}).subscribe({
        next : v => this.vote = v,
        error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
      });
    }
    
  }

  refreshPost(){
    this.postService.getById(this.id).subscribe((p : OutputPostDto) => this.post = p);
  }

  deleteVote(){
    this.voteService.delete(this.id).subscribe({
      next : () => this.vote = undefined,
      error : (e : HttpErrorResponse) => console.log(e.error.message)
    });
  }

  showErrorMessage(message : string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

  commenta(){
    this.commentService.commenta({content : this.formCommento.controls['newComment'].value , idPost : this.id}).subscribe(()=>this.refreshPost());
  }

}
