import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { OutputCategoryDto } from 'src/app/models/category/output-category-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable<OutputCategoryDto[]>{
    return this.httpClient.get<OutputCategoryDto[]>(environment.endpoint+"/category");
  }

}
