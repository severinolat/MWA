angular.module("meanWordFoods").factory("CountriesFactory", CountriesFactory);

function CountriesFactory($http){
    return {
        getAllCountries : getAll,
        getOneCountry : getOne,
        addOneCountry : addOne,
        deleteOneCountry : deleteOne,
        editOneCountry : editOne
    };

    function getAll(){
        return $http.get("/api/countries").then(complete).catch(failure);
    }

    function getOne(countryId){
        return $http.get("/api/countries/"+countryId).then(complete).catch(failure);
    }

    function addOne(bodyCountry){
        return $http.post("/api/countries/",bodyCountry).then(complete).catch(failure);
    }

    function deleteOne(id){
        return $http.delete("/api/countries/"+id).then(complete).catch(failure);
    }

    function editOne(id){
        return $http.put("/api/countries/"+id).then(complete).catch(failure);
    }

    function complete(response){
        return response.data;
    }

    function failure(error){
        console.log("Factory http error:",error);
        return error;
    }
}