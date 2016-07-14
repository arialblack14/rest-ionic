import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../home/authservice';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/userpage/userpage.html',
  providers: [[AuthService], [NavController]]
})
export class UserPage {
  nav: any;
  authService: any;

  constructor(authService: AuthService, nav: NavController) {
  	this.authService = authService;
  	this.nav = nav;
  }
  logout() {
  	this.authService.logout();
  	this.nav.push(HomePage);
  }
}
