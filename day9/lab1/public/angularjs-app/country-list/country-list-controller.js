angular.module("meanWordFoods").controller("CountriesController", CountriesController);

    function CountriesController(CountriesFactory){
        const vm = this;
        vm.title ="MEAN Foods";
        CountriesFactory.getAllCountries().then(function(response){
            console.log("here",response);
            vm.countries = response;
        });

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