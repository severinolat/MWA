const mongoose = require('mongoose');
const {objectId} = require("mongodb");
const Student = mongoose.model("Student");


module.exports.coursesgetAll = function(req,res){
    console.log("student courses received");
    const studentId = req.params.studentId;
    

    Student.findById(studentId).select("courses").exec(function(err, students){
        console.log("List of student courses",students);
        res.status(200).json(students.courses);
    });
};

module.exports.courseGetOne = function(req,res){
    const studentId = req.params.studentId;
   Student.findById(studentId).exec(function(err,student){
       const course = student.course;
       res.status(200).json(course);
   });
};