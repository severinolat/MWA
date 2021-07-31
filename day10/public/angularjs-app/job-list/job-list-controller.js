angular.module("meanJobs").controller("JobsController", JobsController);

function JobsController(JobsFactory, $routeParams){
    const vm = this;
   
    JobsFactory.getAllJobs().then(function(jobs){
        console.log("list",jobs);
        vm.jobs = jobs;
        
    })

    vm.form = {};
    vm.addJob = function(){
        if(vm.jobForm.$valid){
            console.log("vm.jobForm",vm.formJob);
            JobsFactory.addOneJob(vm.formJob).then(function(response){
                console.log("job saved");
            });
        }
    }
    
}