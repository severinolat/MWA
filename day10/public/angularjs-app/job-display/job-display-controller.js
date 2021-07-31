angular.module("meanJobs").controller("JobController", JobController);


function JobController(JobsFactory, $routeParams){
    const vm = this;
    const jobId = $routeParams.id;
    JobsFactory.getOneJob(jobId).then(function(job){
        console.log("the job",job+""+ jobId);
        vm.job = job;
        
    })
    
}