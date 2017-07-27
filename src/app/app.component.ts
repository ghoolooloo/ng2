import { Component } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { KeycloakService } from './keycloak-service/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user = this.authenticated() ? KeycloakService.keycloakAuth.tokenParsed['preferred_username'] : '游客';

  roles = this.authenticated() ? KeycloakService.keycloakAuth.realmAccess.roles : [];
  roles2 = this.authenticated() ? KeycloakService.keycloakAuth.resourceAccess.ng2.roles : [];

  message: string;
  errorClass: string = '';

  private serviceUrl: string = 'http://jee.jo:8090/jee/';

  constructor(private http: Http, private kc: KeycloakService) {
  }

  authenticated(): boolean {
    return this.kc.authenticated();
  }

  login() {
    this.kc.login();
  }

  logout() {
    this.kc.logout();
  }

  account() {
    this.kc.account();
  }

  hello() {
    this.http.get(this.serviceUrl + 'hello')
        .subscribe((res: Response) => this.handleResponse(res, this),
                   (error: Response) => this.handleServiceError(error, this));
  }

  getUser(userID: string) {
    this.http.get(this.serviceUrl + 'users/' + userID)
        .subscribe((res: Response) => this.handleResponse(res, this),
                   (error: Response) => this.handleServiceError(error, this));
  }
  
  createUser() {
    var user = {"username":"mary","name":"Mary","email":"mary@mayocase.com","subject":"88888725-7cdb-4586-9ab5-2ac4620d202a","roles":["uma_authorization","user"]};
    this.http.post(this.serviceUrl + 'users', user)
        .subscribe((res: Response) => this.handleResponse(res, this),
                   (error: Response) => this.handleServiceError(error, this));
  }

  private handleResponse(res: Response, comp: AppComponent) {
    comp.errorClass = '';
    comp.message = '内容：' + JSON.stringify(res.json());
  }

  private handleServiceError(error: Response, comp: AppComponent) {
    comp.errorClass = 'error';
    if (error.status === 0) {
      comp.message = 'Request failed';
    } else {
      comp.message = error.status + ' ' + error.statusText;
    }
  }
}
