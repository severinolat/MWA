const express = require("express");
require("dotenv").config();

const path = require("path");
const router = require("./routes");

const app = express();

app.set("port",process.env.PORT);

app.use(function(req,res,next){
    next();
})

app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/",router);


const server = app.listen(app.get("port"), function(){
    console.log("Listening to port", server.address().port);
}) 


