import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';

// models

import { Ma3zoomUser } from './models/Ma3zoomUser';
import { City } from './models/city';
import { Tokens } from './models/Tokens';
import { Order } from './models/order';
import { Product } from './models/products';

@Injectable({
  providedIn: 'root'
})

export class Ma3zoomService {

  private language = localStorage.getItem('lang') ?? 'ar';
  ma3zoomUser: Ma3zoomUser;
  tokens;
  public ma3zoomLoggedIn = false;
  constructor(private http: HttpClient) {
    this.ma3zoomUser = JSON.parse(localStorage.getItem('ma3zoomUser'));
    this.ma3zoomLoggedIn = this.ma3zoomUser != null ? this.ma3zoomUser.loggedIn : false;
  }

  getMa3zoomUserToken() {
    return this.tokens;
  }

  setMa3zoomUserToken(tokens) {
    this.tokens = tokens;
  }

  getMa3zoomUser() {
    return this.ma3zoomUser;
  }
  saveMa3zoomUser() {
    return this.http.post<Ma3zoomUser>( '/node/user/save',  this.ma3zoomUser, {}).subscribe();
  }
  

  getCities() {
    return this.http.get<City[]>( '/node/cities');
  }

  // getProducts() {
  //   return this.http.get<Product[]>( '/node/prod');
  // }

  setLanguage(lang) {
    this.language = lang;
    localStorage.setItem('lang', lang);
  }
  getTokens() {
    return this.http.get<Tokens[]>( '/node/goodluck');
  }
  getLanguage(): string {
    return this.language;
  }

  sendOrder(body) {
    console.log(body);
    return this.http.post<Order>( '/node/order', body, { responseType: 'json' });
  }
}
