const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function _HamdleErrorCreate(err,res){
    console.log("Error creating user");
    res.status(err.status).json(err.message);
}

function _HamdleError(err,res){
    console.log("Error finding user");
    res.status(err.status).json(err.message);
}


  
  async function _ComparPasswords(user,password, userpassword) {
    if (bcrypt.compareSync(password, userpassword)) {
        console.log("user found", user);
        let token = jwt.sign({ username: user.username }, "cs572", { expiresIn: 3600 });
        res.status(200).json({ success: true, token: token });
    } else { res.status(401).json("Unauthorized"); }
  }

module.exports.register = function(req,res){
    
    const newUser = {
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) ,
        name: req.body.name
    };

    console.log("Register user2", newUser);

    User.create(newUser)
        .then(()=>res.status(201).json(user))
        .catch((err)=> _HamdleErrorCreate(err,res));

   
}

module.exports.login = (req, res) => {
    console.log("Loging user");
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username: username })
        .then((user)=>{
            if (user) {
                _ComparPasswords(user,password, user.password)
            } else {
                console.log("user not found", user);
                res.status(400).json("Unauthorized");
            }
        })
        .catch((err)=> _HamdleError(err,res));

    
};

