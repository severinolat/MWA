angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angularjs-app/game-list/games.html",
        controller:"GamesController",
        controllerAs:"vm"
    }).when("/game/:id",{
        templateUrl:"angularjs-app/game-display/games.html",
        controller:"GameController",
        controllerAs:"vm"
    }).when("/deleteGame/:id", {
        templateUrl:"angularjs-app/game-delete/game-delete.html",
        controller : "GameDeleteController",
        controllerAs: "vm"
    }).when("/editGame/:id", {
        templateUrl:"angularjs-app/game-edit/game-edit.html",
        controller : "GameEditController",
        controllerAs: "vm"
    })
}