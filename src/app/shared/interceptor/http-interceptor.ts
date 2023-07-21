import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.headers.get("skip")) {
        request = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + localStorage.getItem("JWT"))
        });
      }
    return next.handle(request);
  }
}