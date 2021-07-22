const { json } = require("express");
const dbConnexion = require("../data/dbConnection");

module.exports.gamesGetAll = function(req,res){
    let count = 5;
    let offset = 0;
    if(req.query && req.query.count){
        count = parseInt(req.query.count);
        if(count > 7) count = 7;
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }

    const db = dbConnexion.get();
    const collection = db.collection("games");
    collection.find().skip(offset).limit(count).toArray(function (err, games){
        console.log("Found games");
        res.status(200).json(games);
    })
}