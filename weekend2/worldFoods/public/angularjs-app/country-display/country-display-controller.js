angular.module("meanWordFoods").controller("CountryController", CountryController);




function CountryController(CountriesFactory, $routeParams){
    const vm = this;
    const countryId = $routeParams.id;
    CountriesFactory.getOneCountry(countryId).then(function(country){
        console.log(country);
        vm.country = country;
        
    })
    
}