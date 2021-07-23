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