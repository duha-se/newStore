import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService, AuthServiceConfig, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {Ma3zoomService} from '../ma3zoom.service';
import {Ma3zoomUser} from '../models/Ma3zoomUser';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  auth2: any;
  user: SocialUser;
  ma3zoomUser: Ma3zoomUser;
  public loggedIn: boolean;
  display: boolean;
  @ViewChild('googleLoginRef', {static: true }) googleLoginRef: ElementRef;
  constructor(private authService: AuthService, private ma3zoomService: Ma3zoomService) {
    this.authService = authService;
    this.ma3zoomUser = new Ma3zoomUser();
  }
  // signInWithFB(): void {
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     if (user != null){
  //       this.loggedIn = true;
  //       this.ma3zoomUser.loggedIn = user.authToken != null;
  //       this.ma3zoomUser.authorizationCode = user.authorizationCode;
  //       this.ma3zoomUser.name = user.name;
  //       this.ma3zoomUser.firstName = user.firstName;
  //       this.ma3zoomUser.lastName = user.lastName;
  //       this.ma3zoomUser.email = user.email;
  //       this.ma3zoomUser.provider = 'Facebook';
  //       this.ma3zoomUser.authToken = user.authToken;
  //       this.ma3zoomUser.photoUrl = user.photoUrl;
  //       this.ma3zoomService.ma3zoomLoggedIn = true;
  //       console.log('ma3zoomUser:', this.ma3zoomUser);
  //       localStorage.setItem('ma3zoomUser', JSON.stringify(this.ma3zoomUser));
  //       location.reload();
  //     }
  //   });
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

  // }

  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
    location.reload();
  }

  ngOnInit() {

    this.googleSDK();
  }

  prepareLoginButton() {

    this.auth2.attachClickHandler(this.googleLoginRef.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        this.loggedIn = true;
        this.ma3zoomUser.loggedIn = googleUser.getAuthResponse().id_token != null;
        this.ma3zoomUser.name = profile.getGivenName();
        this.ma3zoomUser.firstName = profile;
        this.ma3zoomUser.lastName = profile.getFamilyName();
        this.ma3zoomUser.email = profile.getEmail();
        this.ma3zoomUser.provider = 'Google';
        this.ma3zoomUser.authToken = googleUser.getAuthResponse().id_token;
        this.ma3zoomUser.photoUrl = profile.getImageUrl();
        this.ma3zoomService.ma3zoomLoggedIn = true;
        console.log('ma3zoomUser:', this.ma3zoomUser);
        localStorage.setItem('ma3zoomUser', JSON.stringify(this.ma3zoomUser));
        window.location.reload();
      }, (error) => {
        console.error('prepareLoginButton', JSON.stringify(error, undefined, 2));
      });
  }
  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '924150272022-iplborojemq7vgupuj23eqf273lsunrm.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  displayDialog(){
    this.display = true;
  }
}
