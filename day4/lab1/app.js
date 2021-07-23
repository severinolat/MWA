const express = require("express");
require("dotenv").config();
require("./api/data/db");
const path = require("path");
const router = require("./api/routes");
const app = express();


app.set("port", process.env.PORT);

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
})

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/api", router);


const server = app.listen(app.get("port"),function(){
    console.log("Listening to port",server.address().port);
})