const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    name: String,
    grade : Number
});

mongoose.model("Student", studentsSchema, "students");