angular.module("meanWordFoods").controller("RegisterController", RegisterController);

function RegisterController(UsersFactory){
    const vm = this;
    vm.userForm = {}; 
    vm.register = function(){
        if(vm.user.password !== vm.user.repeatpassword){
            vm.err = "Passwords must match";
        } else{
            UsersFactory.register(vm.user).then(function(response) {
                console.log(response);
                vm.message = "successful registration";
                vm.err = "";
            })
        }
    }
}
