import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OutputCategoryDto } from 'src/app/models/category/output-category-dto.model';
import { RegistrationPostDto } from 'src/app/models/post/registration-post-dto.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PostService } from 'src/app/shared/services/post-service.service';

@Component({
  selector: 'app-crea-post',
  templateUrl: './crea-post.component.html',
  styleUrls: ['./crea-post.component.css']
})
export class CreaPostComponent implements OnInit {

  formPost : FormGroup;
  categorie !: OutputCategoryDto[];
  formTags : string[] = [];

  constructor(private formBuilder : FormBuilder, private categoryService : CategoryService, private postService : PostService){
    this.formPost = this.formBuilder.group({
      titolo: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      tags: new FormControl()
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next : (catList : OutputCategoryDto[]) => this.categorie = catList,
      error : () => console.log('errore durante il caricamento delle categorie')
    })
  }

  getRequiredErrorMessage(field : string) : string {
    return this.formPost.controls[field].hasError('required') ? 'Inserisci un valore' : '';
  }

  addTag(){
    this.formTags.push(this.formPost.controls['tags'].value);
    this.formPost.controls['tags'].reset();
  }
  deltag(tag : string){
    this.formTags = this.formTags.filter((v) => v !== tag);
  }

  creaPost(){
    console.log(this.formPost.controls['titolo'].value);
    console.log(this.formPost.controls['body'].value);
    console.log(this.formPost.controls['category'].value);
    
    
    
    let newPost : RegistrationPostDto = {
      title : this.formPost.controls['titolo'].value,
      body : this.formPost.controls['body'].value,
      category : this.formPost.controls['category'].value,
      tags : this.formTags
    };

    this.postService.create(newPost).subscribe(
      () => console.log('post creato')
      
    );

  }

}
