const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    location :{
        //address: String
        type:{
            type: String
        },
        coordinates:{
            type: [Number], // store coordinates in longitude (E/W) latitude (N/S)
            index: "2dsphere"
        } 
    }
});

const skillsSchema = new mongoose.Schema({
    name: String
})

const jobsSchema = new mongoose.Schema({
    title: String,
    salary:{
        type:Number,
        required: true
    },
    location: locationSchema,
    description: String,
    experience: Number,
    skills:[skillsSchema],
    postdate: String,


});

mongoose.model("Job", jobsSchema, "jobs");