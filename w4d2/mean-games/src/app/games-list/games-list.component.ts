import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';


import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  // private _game1:Game = {
  //   title: "Mr.Jack",
  //   price: 33.96,
  //   year: 2006
  // }

  // private _game2:Game = {
  //   title: "Flock",
  //   price: 15.99,
  //   year: 2016
  // }
  private _title:string ="title";
  private _price:string ="price";

  private _newGame:Game = new Game();

  private _games : Game[]= []
  public get games():Game[]{ return this._games}

  public gameForm!:FormGroup;

  public get title():string{return  this._title};
  public set title(title:string){ this._title= title};

  public get newGame():Game{return this._newGame}
  public set newGame(game:Game){this._newGame = game}

  //dependance injection
  constructor(private gamesService:GamesDataService, private route:ActivatedRoute, private formBuilder:FormBuilder) { }


  ngOnInit(): void {
    // this.gameForm = this.formBuilder.group({
    //   title : "TitleSetOnInit",
    //   price : 10.99,
    // })

    this.gameForm = new FormGroup({
      title : new FormControl("TitleSetOnInit"),
      price : new FormControl(10.99),
    });

    let count: string = this.route.snapshot.queryParams.count;
    console.log("count", count);
    
    this.gamesService.getGames(count)
    .then(response =>{
      this._games = response;
    }).catch(function (err) {
      console.log("Cannot get games",err);
      
    });
  }

  save(){
    console.log("Saving game",this.newGame);
    
  }

  gameSave(){
    console.log("Saving game",this.gameForm);
    
  }



}

export class Game{
  _id!: String;
  title!: string;
  price: number=0.0;
  year: number = 1990;
  minPlayers:number = 1;
  maxPlayers:number =1;
  minAge: number =6;
  rate:number = 1;
  //publisherName!: String;
}
