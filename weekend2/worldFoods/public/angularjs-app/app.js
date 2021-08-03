angular.module("meanWordFoods", ["ngRoute", "angular-jwt"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angularjs-app/country-list/countries.html",
        controller:"CountriesController",
        controllerAs:"vm"
    }).when("/country/:id",{
        templateUrl:"angularjs-app/country-display/country.html",
        controller:"CountryController",
        controllerAs:"vm"
    }).when("/deleteCountry/:id", {
        templateUrl:"angularjs-app/country-delete/country-delete.html",
        controller : "CountryDeleteController",
        controllerAs: "vm"
    }).when("/editCountry/:id", {
        templateUrl:"angularjs-app/country-edit/country-edit.html",
        controller : "CountryEditController",
        controllerAs: "vm"
    }).when("/register", {
        templateUrl: "angularjs-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    })
}