import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './games-list/games-list.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private apiBaseUrl: string='http://localhost:3000/api';

  constructor(private http:HttpClient) { }

    public getGames(count:string):Promise<Game[]>{
      let url: string = this.apiBaseUrl+"/games";
      if(count){
        url = url+"?count="+count;
      }
      return this.http.get(url).toPromise()
        .then(response => response as Game[])
        .catch(this._handleError)
    }

    private _handleError(error:any):Promise<any>{
      console.log("something went wrong", error);
      return Promise.reject(error.message || error)
    }

    public getGame(id:string):Promise<Game>{
      const url: string = this.apiBaseUrl+"/games/"+id;
      return this.http.get(url).toPromise()
        .then(response => response as Game)
        .catch(this._handleError)
    }
}
