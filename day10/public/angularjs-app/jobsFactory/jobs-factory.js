angular.module("meanJobs").factory("JobsFactory", JobsFactory);

function JobsFactory($http){
    return {
        getAllJobs : getAll,
        getOneJob : getOne,
        addOneJob : addOne,
        deleteOneJob : deleteOne,
        editOneJob : editOne
    };

    function getAll(){
        return $http.get("/api/jobs").then(complete).catch(failure);
    }

    function getOne(jobId){
        return $http.get("/api/jobs/"+jobId).then(complete).catch(failure);
    }

    function addOne(bodyJob){
        return $http.post("/api/jobs/",bodyJob).then(complete).catch(failure);
    }

    function deleteOne(id){
        return $http.delete("/api/jobs/"+id).then(complete).catch(failure);
    }

    function editOne(id){
        return $http.put("/api/jobs/"+id).then(complete).catch(failure);
    }

    function complete(response){
        return response.data;
    }

    function failure(error){
        console.log("Factory http error:",error);
        return error;
    }
}