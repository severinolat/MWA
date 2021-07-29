angular.module("meanGames").controller("GamesController", GamesController);

    function GamesController(GamesFactory){
        const vm = this;
        vm.title ="MEAN Games";
        GamesFactory.getAllGames().then(function(response){
            console.log("here",response);
            vm.games = response;
        });

        vm.formGame = {}
        vm.addGame = function(){
            if(vm.gameForm.$valid){
                console.log("vm.gameForm",vm.formGame);
                GamesFactory.addOneGame(vm.formGame).then(function(response){
                    console.log("Game saved");
                });
            }
        }
    }