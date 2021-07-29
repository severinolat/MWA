angular.module("meanWordFoods").controller("CountryDeleteController", CountryDeleteController);

function CountryDeleteController(CountriesFactory,$routeParams) {
  const vm = this;
  const countryId = $routeParams.id;
    console.log("here");
    CountriesFactory.deleteOneCountry(countryId).then(function (country) {
    console.log("Delete",country);
    vm.deletedCountry = country;
  });
}