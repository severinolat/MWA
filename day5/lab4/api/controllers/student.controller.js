const mongoose = require("mongoose");
const {objectId} = require("mongodb");

const Student = mongoose.model("Student");

module.exports.studentsgetAll = function(req,res){
    console.log("Json request received");
    let count =5;
    let offset =0;

    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }

    Student.find().skip(offset).limit(count).exec(function(err, students){
        console.log("List of students",students);
        res.status(200).json(students);
    });
}

module.exports.studentsgetOne = function(req,res){
    console.log("Get One students");
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err,student){
        res.status(200).json(student);
    })
}


module.exports.studentsAddOne = function(req,res){
    console.log("AddOne student",req.body);
   
        const newStudent = {
            name : req.body.name,
            grade: parseFloat(req.body.grade),
           
        };
        Student.create(newStudent, function(err,createResponse){
            console.log("ici1",newStudent);
            const response = {
                status : 201,
                message : createResponse
            }
            if(err){
                response.status = 500;
                response.message = err;
            }else{
                response.message = "Student saved";
            }
           
            res.status(response.status).json(response.message);
        })
    

}


module.exports.studentsFullUpdateOne = function(req,res){
    console.log("Get One students with full update");
    const studentId = req.params.studentId;
    
    Student.findById(studentId).exec(function(err,student){
        const response = {
            status:204,
            message:student
        }
        console.log("the student",student);
        if(err){
            console.log("Error finding student");
            res.status =500;
            res.message = err;
            
        }else if(!student){
            response.status = 404;
            response.message = {message: "student with given ID is not found"}
           
        }
        
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        } else{
            //this is where we update the student
            student.name =  req.body.name;
            student.grade =  parseFloat(req.body.grade);
           
            student.save(function(err, updatedStudent){
                if(err){
                    response.status = 500;
                    response.message = err;
                }
               
                res.status(response.status).json(response.message);
                
            });
        }
        
       
    })
   
    
}



module.exports.studentsPartialUpdateOne = function(req,res){
    console.log("Get One students");
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err,student){
        console.log("The",student);
        const response = {
            status:204,
            message:student
        }
        if(err){
            console.log("Error finding student");
            res.status =500;
            res.message = err;
            
        }else if(!student){
            response.status = 404;
            response.message = {message: "student with given ID is not found"}
           
        }
        console.log("her");
        if(response.status !== 204){
            console.log("her2",response.status);
            res.status(response.status).json(response.message);
        } else{
            
            
            if(student.name){student.name =  req.body.name;}
            
            if(student.grade){student.grade = parseFloat(req.body.grade);}
           

            student.save(function(err, updatedStudent){
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
                
            })
        }
       // res.status(response.status).json(response.message);
       
    })
   
    
}



module.exports.studentsDeleteOne = function(req,res){
    console.log("Get One students");
    const studentId = req.params.studentId;
    Student.findByIdAndDelete(studentId).exec(function(err,student){
        const response = {
            status:200,
            message:student
        }
        if(err){
            console.log("Error finding student");
            res.status =500;
            res.message = err;
            
        }else if(!student){
            response.status = 404;
            response.message = {message: "student with given ID is not found"}
           
        }
        res.status(response.status).json(response.message);
       
    })
   
    
}

