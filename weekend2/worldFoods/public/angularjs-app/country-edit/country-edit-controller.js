angular.module("meanWordFoods").controller("CountryEditController", CountryEditController);

function CountryEditController(CountriesFactory,$routeParams) {
  const vm = this;
  const countryId = $routeParams.id;
    console.log("here");

    CountriesFactory.getOneCountry(countryId).then(function(country){
    console.log("Edit",country);
    vm.country = country;
   
    
})

  
        vm.editCountry = function(){
            if(vm.countryForm.$valid){
                console.log("vm.countryForm",vm.formCountry);
                CountriesFactory.editOneCountry(vm.formCountry).then(function(response){
                    console.log("country saved");
                });
            }
        }
}