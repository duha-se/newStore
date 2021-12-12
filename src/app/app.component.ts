import { Component, OnInit } from '@angular/core';
import {AuthService} from "angularx-social-login";
import {Ma3zoomService} from "./ma3zoom.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Super';
  public ma3zoomLoggedIn;
  private ma3zoomService: Ma3zoomService;
  public tokens;

  constructor(private authService: AuthService, ma3zoomService: Ma3zoomService) {
    this.ma3zoomService = ma3zoomService;
    this.ma3zoomLoggedIn = this.ma3zoomService.ma3zoomUser != null ? this.ma3zoomService.ma3zoomUser.loggedIn : false;

  }

  ngOnInit() {
    this.ma3zoomService.getTokens().subscribe(tokens => {
      this.ma3zoomService.setMa3zoomUserToken(tokens);
      localStorage.setItem('goodluck', JSON.stringify(tokens));
    });
  }
  saveMa3zoomUser(){
    this.ma3zoomService.saveMa3zoomUser();
  }
}
