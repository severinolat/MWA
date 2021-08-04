angular.module("meanGames").factory("GamesFactory", GamesFactory);

function GamesFactory($http){
    return {
        getAllGames : getAll,
        getOneGame : getOne,
        addOneGame : addOne,
        deleteOneGame : deleteOne,
        editOneGame : editOne
    };

    function getAll(){
        return $http.get("/api/games").then(complete).catch(failure);
    }

    function getOne(gameId){
        return $http.get("/api/games/"+gameId).then(complete).catch(failure);
    }

    function addOne(bodyGame){
        return $http.post("/api/games/",bodyGame).then(complete).catch(failure);
    }

    function deleteOne(id){
        return $http.delete("/api/games/"+id).then(complete).catch(failure);
    }

    function editOne(id){
        return $http.put("/api/games/"+id).then(complete).catch(failure);
    }

    function complete(response){
        return response.data;
    }

    function failure(error){
        console.log("Factory http error:",error);
        return error;
    }
}