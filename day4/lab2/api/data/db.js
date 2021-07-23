require("dotenv").config();
const mongoose = require("mongoose");
require("./students-model");

const dbUrl = process.env.DB_URL+process.env.DB_NAME;
mongoose.connect(dbUrl);

mongoose.connection.on("connected",function(){
    console.log("Mongoose connected to ",dbUrl);
});

mongoose.connection.on("disconnected",function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function(){
    console.log("Mongoose connection error",err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Disconnected by application termination");
        process.exit(0);
    })
})