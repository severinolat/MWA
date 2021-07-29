angular.module("meanWordFoods").factory("CountriesFactory", CountriesFactory);

function CountriesFactory($http){
    return {
        getAllCountries : getAll,
        getOneCountry : getOne
    };

    function getAll(){
        return $http.get("/api/countries").then(complete).catch(failure);
    }

    function getOne(countryId){
        return $http.get("/api/countries/"+countryId).then(complete).catch(failure);
    }

    function complete(response){
        return response.data;
    }

    function failure(error){
        console.log("Factory http error:",error);
        return error;
    }
}