angular.module("meanGames").factory("AuthenticationInterceptor", AuthenticationInterceptor);

function AuthenticationInterceptor($window){
    
    return{
        request: request
    };

    function request(config){
        config.headers = config.headers || {};
        if($window.sessionStorage.token){
            config.headers.authorization = "Bearer"+ $window.sessionStorage.token;
        }
    }
}