import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from './countries-list/countries-list.component';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {

  private apiBaseUrl: string='http://localhost:3000/api';


  constructor(private http:HttpClient) { }

  public getCountries(count:string):Promise<Country[]>{
    let url: string = this.apiBaseUrl+"/countries";
    if(count){
      url = url+"?count="+count;
    }
    return this.http.get(url).toPromise()
      .then(response => response as Country[])
      .catch(this._handleError)
  }

  private _handleError(error:any):Promise<any>{
    console.log("something went wrong", error);
    return Promise.reject(error.message || error)
  }

  public getCountry(id:string):Promise<Country>{
    const url: string = this.apiBaseUrl+"/countries/"+id;
    return this.http.get(url).toPromise()
      .then(response => response as Country)
      .catch(this._handleError)
  }
}
