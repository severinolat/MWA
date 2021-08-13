import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryPageComponent } from './country-page/country-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CountriesListComponent,
    CountryPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
      path:"",
      component:WelcomeComponent
      },
      {
        path:"countries",
        component:CountriesListComponent
      },
      {
        path:"country/:id",
        component:CountryPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
