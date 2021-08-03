const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.register = function(req,res){
    console.log("Register user");

    const newUser = {
        username : req.body.username,
        password : req.body.password,
        name: req.body.name
    };

    User.create(newUser, function(err,user){
        if(err){
            console.log("Error creating user",err);
            res.status(500).json({message:err});
        } else{
            console.log("User created");
            res.status(201).json(user);
        }
    })
}

