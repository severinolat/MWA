angular.module("meanWordFoods").factory("AuthFactory", AuthFactory);

function AuthFactory(){
    let auth = false;
    return{
        authenticated: auth
    };
}

let auth = { authenticated: false }
