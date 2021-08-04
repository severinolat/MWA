const express = require("express");
require("dotenv").config();
const child_process = require("child_process");
const app = express();
app.set("port",process.env.PORT);

console.log("Show 1");
const newProcess = child_process.spawn("node",["./fibonacci"],{stdio:"inherit"});
console.log("Show 2");

const server = app.listen(app.get("port"),function(){
    console.log("Listening to port", server.address().port);
});

