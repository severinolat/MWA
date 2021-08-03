angular.module("meanWordFoods").controller("LoginController", LoginController);

function LoginController(UsersFactory,$window, $location, jwtHelper, AuthFactory){
    vm = this;
    vm.credential ={};
    vm.isLoggedIn = function(){
        return AuthFactory.authenticated;
    };

    vm.login = function(){
        UsersFactory.login(vm.credential).then(function(result){
            console.log("result", result);
            if(result.success){
                //store token in browser
                $window.sessionStorage.token = result.token;
                vm.credential = {};

                //retrieve data from token
                const token = $window.sessionStorage.token;
                const decodedToken = jwtHelper.decodeToken(token);
                vm.loggedInUser = decodedToken.name;

                AuthFactory.authenticated = true;
                $location.path("/");

            }
            vm.err="";
        }).catch(function(err){
            console.log("err",err);
            vm.err=err;
        })
    }

    vm.logout = function(){
        AuthFactory.authenticated = true;
        delete $window.sessionStorage.token;
        $location.path("/");
    }
}
