const { response } = require("express");
const mongoose = require("mongoose");
 const Job = mongoose.model("Job");

 module.exports.jobsgetAll = function(req,res){
     console.log("request rec");
     let count = 5;
     let offset =0;

     if(req.query && req.query.offset){
         offset = parseInt(req.query.offset);
     }

     if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }

    Job.find().skip(offset).limit(count).exec(function(err,jobs){
        console.log("list of jobs",jobs);
        res.status(200).json(jobs);
    })
 }

 module.exports.jobgetOne = function(req,res){
     console.log("get one job");
     const jobId = req.params.jobId;
     Job.findById(jobId).exec(function(err,job){
         res.status(200).json(job);
     });
 }

 module.exports.jobsAddOne = function(req,res){
     console.log("Add one job");
        const addate = Date.now();
        const newJob = {
            title : req.body.title,
            salary : parseFloat(req.body.salary),
            description: req.body.description,
            location:{},
            skills: [],
            postdate: addate
        };

    Job.create(newJob,function(err,createResponse){
        console.log("new creating job",newJob);
        const response = {
            status: 201,
            message: createResponse
        }

        if(err){
            response.status = 500;
            response.message = err
        } else{
            response.message = "Job saved";
        }

        res.status(response.status).json(response.message);
    })
 }


 module.exports.jobsFullUpdateOne = function(req,res){
    console.log("Updating job");
    const jobId = req.params.jobId;

   

    Job.findById(jobId).exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }

        if(err){
            response.status = 500;
            response.message = err

        } else if(!job){
            response.status = 404;
            response.message = {message:"Job id given not found"};
        }

        if(response.status !==204){
            res.status(response.status).json(response.message);
        } else{
            job.title = req.body.title;
            job.salary = parseFloat(req.body.salary);
            job.description = req.body.description;

            job.save(function(err,updatedJob){
                if(err){
                    response.status = 500;
                    response.message = err;
                }

                res.status(response.status).json(response.message);
            })
        }
    })

    
 }


 module.exports.jobsPartialUpdateOne = function(req,res){
    console.log("Updating partial job");
    const jobId = req.params.jobId;

   

    Job.findById(jobId).exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }

        if(err){
            response.status = 500;
            response.message = err

        } else if(!job){
            response.status = 404;
            response.message = {message:"Job id given not found"};
        }

        if(response.status !==204){
            res.status(response.status).json(response.message);
        } else{

            if(req.body.title){job.title = req.body.title;}
            if(req.body.salary){job.salary = parseFloat(req.body.salary);}
            if(req.body.jdescription){job.description = req.body.description;}
            

            job.save(function(err,updatedJob){
                if(err){
                    response.status = 500;
                    response.message = err;
                }

                res.status(response.status).json(response.message);
            })
        }
    })

    
 }

 module.exports.jobDeleteOne = function(req,res){
    console.log("delete one");
    const jobId = req.params.jobId;
    Job.findByIdAndDelete(jobId).exec(function(err,job){
        const response = {
            status: 204,
            message: job
        }

        if(err){
            response.status = 500;
            response.message = err

        } else if(!job){
            response.status = 404;
            response.message = {message:"Job id given not found"};
        }
        res.status(response.status).json(response.message);

        
    })

 }