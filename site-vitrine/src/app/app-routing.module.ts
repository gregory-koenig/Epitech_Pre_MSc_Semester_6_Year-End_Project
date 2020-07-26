import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormateurComponent } from './formateur/formateur.component';
import { ContactComponent } from './contact/contact.component';
import { DemoComponent } from './demo/demo.component';
import { TemoignagesComponent } from './temoignages/temoignages.component';
import { UndercoComponent } from './underco/underco.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'les-formateurs', component: FormateurComponent },
  { path: 'les-temoignages', component: TemoignagesComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'a-venir', component: UndercoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
