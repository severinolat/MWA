angular.module("meanGames").controller("GameDeleteController", GameDeleteController);

function GameDeleteController(GamesFactory,$routeParams) {
  const vm = this;
  const gameId = $routeParams.id;
    console.log("here");
  GamesFactory.deleteOneGame(gameId).then(function (game) {
    console.log("Delete",game);
    vm.deletedGame = game;
  });
}