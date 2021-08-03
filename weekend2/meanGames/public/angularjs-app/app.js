angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);


function config($routeProvider,$httpProvider){

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
    }).when("/register", {
        templateUrl: "angularjs-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    })
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root
        }
    });
}
