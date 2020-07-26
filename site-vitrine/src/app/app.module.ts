import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormateurComponent } from './formateur/formateur.component';
import { DemoComponent } from './demo/demo.component';
import { TemoignagesComponent } from './temoignages/temoignages.component';
import { ContactComponent } from './contact/contact.component';
import { UndercoComponent } from './underco/underco.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormateurComponent,
    DemoComponent,
    TemoignagesComponent,
    ContactComponent,
    UndercoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
