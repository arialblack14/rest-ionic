import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {AuthService} from '../home/authservice';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [AuthService]
})
export class Signup {
  newcreds: any;
  authService: any;
  nav: any;

  constructor(nav: NavController, authService: AuthService) {
  	this.newcreds = {
  		name: '',
  		password: ''
  	}
  	this.authService = authService;
  	this.nav = nav;
  }
  register(user) {
  	this.authService.adduser(user).then(data => {
  		if (data) {
  			var alert = Alert.create({
  				title: 'Success',
  				subTitle: 'User created',
  				buttons: ['ok']
  			});
  			this.nav.present(alert);
  		}
  	});	
  }
}
