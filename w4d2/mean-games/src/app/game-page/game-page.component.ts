import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../games-list/games-list.component';
import { GamesDataService } from '../games-data.service';
//import { GameRattingComponent } from '../game-ratting/game-ratting.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  private _game:Game = new Game ;

  public get game(){return this._game}

  constructor(private gamesService:GamesDataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const gameId:string = this.route.snapshot.params.id;
    this.gamesService.getGame(gameId)
        .then(this._receivedGane.bind(this))
        .catch(this._handlerError);

  }

  private _receivedGane(game:Game){
      console.log("received game",game);
      this._game = game;
      
  }
  private _handlerError(error:any){
    console.log("Error in game-page componemt", error);
    
  }

}
