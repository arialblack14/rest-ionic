import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { AuthService } from '../home/authservice';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/userpage/userpage.html',
  providers: [AuthService]
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
  	this.nav.setRoot(HomePage);
  }

  getinfo() {
  	this.authService.getinfo().then(data => {
  		if (data.success) {
  			var alert = Alert.create({
  				title: data.success,
  				subTitle: data.msg,
  				buttons: ['ok']
  			});
  			this.nav.present(alert);
  		}
  	});
  }
}
