angular.module("meanWordFoods", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angularjs-app/country-list/countries.html",
        controller:"CountriesController",
        controllerAs:"vm"
    }).when("/country/:id",{
        templateUrl:"angularjs-app/country-display/country.html",
        controller:"CountryController",
        controllerAs:"vm"
    })
}