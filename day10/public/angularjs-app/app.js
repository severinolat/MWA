angular.module("meanJobs", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angularjs-app/job-list/jobs.html",
        controller:"JobsController",
        controllerAs:"vm"
    })
}