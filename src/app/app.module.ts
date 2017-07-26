import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { KeycloakService } from './keycloak-service/keycloak.service';
import { KeycloakHttp, KEYCLOAK_HTTP_PROVIDER } from './keycloak-service/keycloak.http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    KeycloakService,
    KEYCLOAK_HTTP_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
