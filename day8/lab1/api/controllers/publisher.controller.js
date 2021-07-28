const { response } = require('express');
const mongoose = require('mongoose');
const Game = mongoose.model("Game");

const _addPublisher = function(req,res, game){
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, savedGame){
        const response = {
            status:201,
            message : savedGame
        }

        if(err){
            response.status = 500;
            response.message = err;
        } else{

        }


    });
}

module.exports.publisherGetOne = function(req,res){
    const gameId = rep.params.gameId;
   Game.findById(gameId).exec(function(err,game){
       const publisher = game.publisher;
       res.status(200).json(publisher);
   })
}