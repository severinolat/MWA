angular.module("myAnimeChainApp").controller("MainController", MainController)



function MainController($http) {
    var vm = this;
    $http.get("https://animechan.vercel.app/api/quotes").then(function (response) {
      console.log(response.data);
      vm.quotes = response.data;
    });
}