angular.module("meanWordFoods").factory("UsersFactory", UsersFactory);

function UsersFactory($http) {
    return {
        register: register,
        login: login
    };

    function register(user) {
        return $http.post("/api/users", user).then(complete).catch(failed);
    }

    function login(user) {
        return $http.post("/api/login", user).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }

}