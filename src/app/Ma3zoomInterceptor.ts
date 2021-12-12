import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ma3zoomUser} from './models/Ma3zoomUser';
import {AuthService} from 'angularx-social-login';
import {Ma3zoomService} from './ma3zoom.service';

@Injectable()
export class Ma3zoomInterceptor implements HttpInterceptor {
  ma3zoomUser: Ma3zoomUser;
  tokens;
  ma3zoomService: Ma3zoomService;
  constructor(private authService: AuthService, ma3zoomService: Ma3zoomService) {
    this.ma3zoomService = ma3zoomService;
    this.ma3zoomUser = this.ma3zoomService.getMa3zoomUser();
    this.tokens = JSON.parse(localStorage.getItem('goodluck'));
  }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const modifiedReq = httpRequest.clone({
        headers: httpRequest.headers.set('goodluck', this.tokens != null && this.tokens[0].token ? this.tokens[0].token + this.addKey() : '')
      });
    // tslint:disable-next-line:triple-equals
      if (httpRequest.method != 'GET') {
      const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      // tslint:disable-next-line:max-line-length
      if (this.ma3zoomUser.loggedIn === true && this.ma3zoomUser.authToken != null && this.ma3zoomUser.authToken.length > 190 && emailPattern.test(this.ma3zoomUser.email)) {
            return next.handle(modifiedReq);
          }else{
            return;
          }
      }else{
        return next.handle(modifiedReq);
      }
  }
  addKey(): string {
    const date = new Date();
    const xy = Date.parse(new Date().toISOString()) + '' ;
    const revArray = [];
    const length = xy.length - 1;
    for (let i = length; i >= 0; i--) {
      revArray.push(xy[i]);
    }
    return revArray.join('');
  }
}
