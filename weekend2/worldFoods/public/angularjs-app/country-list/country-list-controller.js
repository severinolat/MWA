angular.module("meanWordFoods").controller("CountriesController", CountriesController);

    function CountriesController(CountriesFactory, AuthFactory){
        const vm = this;
        vm.title ="MEAN Foods";
        CountriesFactory.getAllCountries().then(function(response){
            console.log("here",response);
            vm.countries = response;
        });
        vm.isLoggedIn = function() {
            return AuthFactory.isLoggedIn;
        }

        vm.formCountry = {}
        vm.addCountry = function(){
            if(vm.countryForm.$valid){
                console.log("vm.countryForm",vm.formCountry);
                CountriesFactory.addOneCountry(vm.formCountry).then(function(response){
                    console.log("Country saved");
                });
            }
        }
    }