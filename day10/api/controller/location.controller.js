const mongoose = require('mongoose');

const Job = mongoose.model("Job");


const _addLocation = function(req,res, job){
    job.location.name = req.body.name;
    job.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    job.save(function(err, savedJob){
        const response = {
            status:201,
            message : savedJob
        }

        if(err){
            response.status = 500;
            response.message = err;
        } else{
            console.log("Location added");
            response.status = 204;
            response.message = savedJob;
            res.status(response.status).json(response.message);
        }


    });
}



module.exports.locationAddOne = function(req,res){
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }

        if (err){
            response.status = 500,
            response.message = err;
        } else if (!job){
            console.log("Error ading food");
            response.status = 404,
            response.message = {"message": "job ID not found"};
        } 
        if (job) {
            _addLocation(req, res, job);
        } else{
            res.status(response.status).json(response.message);
        }
        
    })
}

module.exports.locationFullUpdate = function(req,res){
    console.log("update full location");
    const jobId = req.params.jobId;

    Job.findById(jobId).exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }
        if(err){
            console.log("Error updating job",err);
            response.status = 500,
            response.message = err;
        } else if(!job){
            console.log("Job not found");
            response.status = 404,
            response.message = err;
        }
        if(response.status !==204){
            res.status(response.status).json(response.message);
        } else{
            job.location.name = req.body.name;
            job.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
           

            job.save(function(err,updatedJob){
                if(err){
                    response.status = 500;
                    response.message = err;
                } else{
                    response.message = updatedJob;
                }
                res.status(response.status).json(response.message);
            })
        }
    })

}



module.exports.locationPartialUpdate = function(req,res){
    console.log("update partial location");
    const jobId = req.params.jobId;

    Job.findById(jobId).exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }
        if(err){
            console.log("Error updating job",err);
            response.status = 500,
            response.message = err;
        } else if(!job){
            console.log("Job not found");
            response.status = 404,
            response.message = err;
        }
        if(response.status !==204){
            res.status(response.status).json(response.message);
        } else{
            if(req.body.name){job.location.name = req.body.name;}
            if(req.body.lat && req.body.lng ){coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];}
          
            job.save(function(err,updatedJob){
                if(err){
                    response.status = 500;
                    response.message = err;
                } else{
                    response.message = updatedJob;
                }
                res.status(response.status).json(response.message);
            })
        }
    })

}


module.exports.locationDeleteOne = function(req,res){
    console.log("delete location");
    const jobId = req.params.jobId;

    Job.findById(jobId).exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }
        if(err){
            console.log("Error updating job",err);
            response.status = 500,
            response.message = err;
        } else if(!job){
            console.log("Job not found");
            response.status = 404,
            response.message = err;
        }
        if(response.status !==204){
            res.status(response.status).json(response.message);
        } else{
            job.location.remove(); 
            job.save(function(err,updatedJob){
                if(err){
                    response.status = 500;
                    response.message = err;
                } else{
                    response.message = updatedJob;
                }
                res.status(response.status).json(response.message);
            })
        }
    })
    
}