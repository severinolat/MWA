import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Country } from '../countries-list/countries-list.component';
import { CountriesDataService } from '../countries-data.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  private _country:Country = new Country ;

  public get country(){return this._country}


  constructor(private countriesService: CountriesDataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const countryId:string = this.route.snapshot.params.id;
    this.countriesService.getCountry(countryId)
        .then(this._receivedCountry.bind(this))
        .catch(this._handlerError);
  }

  private _receivedCountry(country:Country){
    console.log("received country",country);
    this._country = country;
    
}
  private _handlerError(error:any){
    console.log("Error in country-page componemt", error);
    
  }

}
