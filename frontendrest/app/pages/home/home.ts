import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from './authservice';
import {UserPage} from '../userpage/userpage';
import { Signup } from '../signup/signup';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AuthService]
})
export class HomePage {
  usercreds: any;
  authService: any;
  nav: any;

  constructor(nav: NavController, authService: AuthService) {
  	this.usercreds = {
  		name: '',
  		password: ''
  	}
  	this.authService = authService;
  	this.nav = nav;
  }
  login(user) {
  	this.authService.authenticate(user).then(data => {
  		if (data) {
  			this.nav.setRoot(UserPage);
  		}
  	});	
  }

  signup() {
  	this.nav.setRoot(Signup);
  }
}
