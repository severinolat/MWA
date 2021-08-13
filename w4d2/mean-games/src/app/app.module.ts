import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamePageComponent } from './game-page/game-page.component';
import { FooterComponent } from './footer/footer.component';
import { GameRattingComponent } from './game-ratting/game-ratting.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GamePageComponent,
    FooterComponent,
    GameRattingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:WelcomeComponent
      },
      {
        path:"games",
        component:GamesListComponent
      },
      {
        path:"game/:id",
        component:GamePageComponent
      },
      {
        path:"**",
        component: ErrorPageComponent
      }
    ])

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
