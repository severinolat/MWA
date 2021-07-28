angular.module("meanGames").directive("gameRating", GameRating);

function GameRating(){
     return{
         restrict: "E",
         templateUrl: "angularjs-app/game-rating-directive/game-rating-directive.js",
         bindToController: true,
         controller: "GameController",
         controllerAs:""


     }
}