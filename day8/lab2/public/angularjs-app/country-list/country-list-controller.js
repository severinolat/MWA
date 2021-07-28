angular.module("meanWordFoods").controller("CountriesController", CountriesController);

    function CountriesController(CountriesFactory){
        const vm = this;
        vm.title ="MEAN Foods";
        CountriesFactory.getAllCountries().then(function(response){
            console.log("here",response);
            vm.countries = response;
        });
    }