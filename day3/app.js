const express = require('express');
require("dotenv").config();
const path = require("path");
const router = require("./api/routes");
const app = express();
require("./api/data/dbConnection").open();

app.set("port",process.env.PORT);

app.use(function(req, res, next){
    next();
})


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/api", router);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port", server.address().port);
})