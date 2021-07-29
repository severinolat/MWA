const express = require("express");
require("dotenv").config();
require("./api/data/db");
const path = require("path");
const router = require("./api/routes");

const app = express();
app.set("port",process.env.PORT);

//use express static server

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

//make node_module folder visible to angular
app.use("/node_modules", express.static(path.join(__dirname,"node_modules")));


app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

// tel express how to undestant body
app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use("/api", router);




const server = app.listen(process.env.PORT,function(){
    console.log("Listening to port", server.address().port);
});

