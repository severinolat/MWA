angular.module("myAnimeChainApp").controller("quoteController", QuoteController)

function QuoteController($http, $routeParam){
    const vm = this;
    $http.get("https://animechan.vercel.app/api/quotes")
    .then(function(response){
        console.log("response",response);
        //vm.joke = response.data[0];
    });

}
