angular.module("myAnimeChainApp").factory("quoteFactory", QuoteFactory);

function QuoteFactory($http){
    return{
        getTenQuotes: getTen,
        getOneQuote: getOne
    }

    function getTen(){

    }

    function getOne(){

    }
}