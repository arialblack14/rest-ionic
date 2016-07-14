import { NavController } from 'ionic-angular';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
	http: any;
	nav: any;
	isLoggedin: boolean = false;
	AuthToken: any;

	constructor(http: Http, navController: NavController) {
		this.http = http;
		this.nav = navController
		this.isLoggedin = false;
		this.AuthToken = null;
	}

	storeUserCredentials(token) {
		window.localStorage.setItem('alex', token);
		this.useCredentials(token);
	}

	useCredentials(token) {
		this.isLoggedin = true;
		this.AuthToken = token;
	}

	loadUserCredentials() {
		var token = window.localStorage.getItem('alex');
		this.useCredentials(token);
	}

	destroyUserCredentials() {
		this.isLoggedin = false;
		this.AuthToken = null;
		window.localStorage.clear();
	}

	authenticate(user) {
		var creds = "name=" + user.name + "&password=" + user.password;
		var headers = new Headers();

		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return new Promise(resolve => {
			this.http.post('http://localhost:3333/authenticate', creds, { headers: headers }).subscribe(data => {
				if (data.json().success) {
					this.storeUserCredentials(data.json().token);
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	}

	adduser(user) {
		var creds = "name=" + user.name + "&password=" + user.password;
		var headers = new Headers();

		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return new Promise(resolve => {
			this.http.post('http://localhost:3333/adduser', creds, { headers: headers }).subscribe(data => {
				if (data.json().success) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	}

	logout() {
		this.destroyUserCredentials();
	}
}