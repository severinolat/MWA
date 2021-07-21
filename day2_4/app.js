const express = require("express");
require("dotenv").config();

const app = express();
app.set("port",process.env.PORT);


app.get("/", function(req,res){
    console.log("Get received");
    res.status(200).send("HOME page");
});

app.get("/add/:num1", function(req,res){
    console.log("Get json received");
    let num2 = 0;
    if(req.query && req.query.num2){
        num2 = parseInt(req.query.num2);
    }
    const num1 = parseInt(req.params.num1);
    const result = num1+num2;
    res.status(200).send("The result of adding "+num1+" and " +num2+ " equal: "+result);
});



const server = app.listen(app.get("port"),function(){
    console.log("Listening to port", server.address().port);
})