angular.module("meanGames").controller("GameEditController", GameEditController);

function GameEditController(GamesFactory,$routeParams) {
  const vm = this;
  const gameId = $routeParams.id;
    console.log("here");

  GamesFactory.getOneGame(gameId).then(function(game){
    console.log("Edit",game);
    vm.game = game;
    vm.rating= _getStarsArray(game.rate);
    
})

  
        vm.editGame = function(){
            if(vm.gameForm.$valid){
                console.log("vm.gameForm",vm.formGame);
                GamesFactory.editOneGame(vm.formGame).then(function(response){
                    console.log("Game saved");
                });
            }
        }
}