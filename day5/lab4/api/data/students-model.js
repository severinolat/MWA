const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    name: String
});

const studentsSchema = new mongoose.Schema({
    name: String,
    grade : Number,
    courses: [coursesSchema]
});

mongoose.model("Student", studentsSchema, "students");