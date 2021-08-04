const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = function(req,res){
    console.log("Register user",req.body.username+" "+ req.body.password+"  "+ req.body.name);

    

    const newUser = {
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) ,
        name: req.body.name
    };

    console.log("Register user2", newUser);

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

module.exports.login = (req, res) => {
    console.log("Loging user");
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username }).exec((err, user) => {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                console.log("user found", user);
                let token = jwt.sign({ username: user.username }, "cs572", { expiresIn: 3600 });
                res.status(200).json({ success: true, token: token });
            } else { res.status(401).json("Unauthorized"); }
        } else {
            console.log("user not found", user);
            res.status(400).json("Unauthorized");
        }
    });
};

