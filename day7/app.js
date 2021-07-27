angular.module("myAnimeChainApp", ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        template: "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    })
}