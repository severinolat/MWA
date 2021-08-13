import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



import { CountriesDataService } from '../countries-data.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {

  private _countries : Country[]= []
  public get countries():Country[]{ return this._countries}

  constructor(private countriesService: CountriesDataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let count: string = this.route.snapshot.queryParams.count;
    console.log("count", count);

    this.countriesService.getCountries(count)
    .then(response =>{
      this._countries = response;
    }).catch(function (err) {
      console.log("Cannot get countries",err);
      
    });
  }

}

export class Country{
  _id!: String;
  name!: String;
  population!: number;
  foods: any = [];


}
