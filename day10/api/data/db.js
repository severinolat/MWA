require("dotenv").config();
const mongoose = require ("mongoose");
require("./jobs-model");

const dbUrl = process.env.DB_URL+process.env.DB_NAME;
console.log("dbUrl",dbUrl);
mongoose.connect(dbUrl);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to", dbUrl);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected to");
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error", err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Disconnected by application termination");
        process.exit(0);
    });
})