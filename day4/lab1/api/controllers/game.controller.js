const mongoose = require("mongoose");
const {objectId} = require("mongodb");

const Game = mongoose.model("Game");

module.exports.gamesgetAll = function(req,res){
    console.log("Json request received");
    let count =5;
    let offset =0;

    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }

    Game.find().skip(offset).limit(count).exec(function(err, games){
        console.log("List of games",games);
        res.status(200).json(games);
    });
}

module.exports.gamesgetOne = function(req,res){
    console.log("Get One games");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        res.status(200).json(game);
    })
}