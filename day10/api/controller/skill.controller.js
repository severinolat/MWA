const mongoose = require("mongoose");

const Job = mongoose.model("Job");

const _addSkill = function(req,res, job){
    const newSkill = {
        name: req.body.name
    };

    job.skills.push(newSkill);

    job.save(function(err, updatedJob){
        const response = {
            status:204,
            message : updatedJob
        }
        if (err){
            response.status = 500;
            response.message = err;
        } else {
            response.message = updatedJob;
        }
        res.status(response.status).json(response.message);

    })
}

module.exports.skillgetAll = function(req,res){
    console.log("skil received");
    const jobId = req.params.jobId;

    Job.findById(jobId).select("skills").exec(function(err,job){
        console.log("list of job skills",job.skills);
        res.status(204).json(job.skills)
    })
}

module.exports.skillgetOne = function(req,res){
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;

    Job.findById(jobId).select("skills").exec(function(err,job){
       const skill = job.skills.id(skillId);
       console.log(skill);
       res.status(204).json(skill);
    });

}


module.exports.skillAddOne = function(req,res){
    console.log("skil add one");
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
            console.log("Error ading skill");
            response.status = 404,
            response.message = {"message": "job ID not found"};
        } 
        if (job) {
            _addSkill(req, res, job);
        } else{
            res.status(response.status).json(response.message);
        }
    });

}

module.exports.skillFullUpdateOne = function(req, res){
    console.log("Get one job request received");

    const jobId = req.params.jobId;
    const skillId = req.params.skillId;


    Job.findById(jobId).exec(function(err, job){
        const response = {
            status: 204,
            message: job
        }
        if (err) {
            console.log("job not updated");
            response.status = 500;
            response.message = err;
        } else if (!job){
            response.status = 404;
            response.message = { "message": "job not found" }
        } if (job) {
            const skill = job.skills.id(skillId);
            if(skill){
                const skillIndex = job.skills.indexOf(skill);

                job.skills[skillIndex] = {
                    _id : skill._id,
                    name : req.body.name,
                   
                }

                job.save(function(err, updatedJob){
                    const response = {
                        status : 204,
                        message : updatedJob
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);

                })
            }else {
                res.status(404).json({"messag": "skill not found."});

            }


            //ph





        }
    })
}




module.exports.skillDeleteOne = function(req, res){
    console.log("Delete request received");

    const jobId = req.params.jobId;
    const skillId = req.params.skillId;
    Job.findById(jobId).exec(function(err, job){
        const response = {
            status: 204,
            message: job
        }
        if (err) {
            console.log("skill not deleted");
            response.status = 500;
            response.message = err;
        } else if (!job){
            response.status = 404;
            response.message = { "message": "Publisher not found" }
        } 
        if (job) {
            const skill = job.skills.id(skillId);

            if(skill){
                var skillIndx = job.skills.indexOf(skill);

                job.skills.splice(skillIndx, 1);

                job.save(function(err, updatedJob){
                    const response = {
                        status : 204,
                        message : updatedJob
                    }
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }

                    res.status(response.status).json(response.message);
                });
            }else {
                res.status(400).json({"message" : "skill not found"});

            }
        }
        //res.status(response.status).json(response.message);
    })
}; 