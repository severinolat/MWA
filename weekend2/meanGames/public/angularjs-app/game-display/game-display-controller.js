angular.module("meanGames").controller("GameController", GameController);


function _getStarsArray(stars){
    return new Array(stars);
}


function GameController(GamesFactory, $routeParams){
    const vm = this;
    const gameId = $routeParams.id;
    GamesFactory.getOneGame(gameId).then(function(game){
        console.log(game);
        vm.game = game;
        vm.rating= _getStarsArray(game.rate)
    })
    
}