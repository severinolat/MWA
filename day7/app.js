angular.module("myAnimeChainApp", ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/quotes",{
        templateUrl: "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    })
}