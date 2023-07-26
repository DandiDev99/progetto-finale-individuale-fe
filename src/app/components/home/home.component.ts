import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/app/environments/environment';
import { OutputPostDto } from 'src/app/models/post/output-post-dto.model';
import { PostService } from 'src/app/shared/services/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  posts !: OutputPostDto[];

  constructor(private postService : PostService , private messageService : MessageService){}

  ngOnInit(): void {
    this.postService.getAll().subscribe({
      next : (postList : OutputPostDto[]) => this.posts = postList,
      error : (e : HttpErrorResponse) => this.showErrorMessage(e.error.message)
    });
  }

  showErrorMessage(message : string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

}
