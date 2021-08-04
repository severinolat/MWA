const express = require("express");
require("dotenv").config();
const child_process = require("child_process");
const app = express();
const fib = require("./fibonacci");
app.set("port",process.env.PORT);

fibonacciPromise = function(number) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            let retVal = fib(number);
            resolve(retVal);
        }, 3000);
    });
}

console.log("Show 1");

fibonacciPromise(41).then((ret) => {
    console.log(ret);
});

console.log("Show 2");

const server = app.listen(app.get("port"),function(){
    console.log("Listening to port", server.address().port);
});

