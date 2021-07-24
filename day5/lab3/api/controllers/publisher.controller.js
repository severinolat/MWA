const { response } = require('express');
const mongoose = require('mongoose');
const Game = mongoose.model("Game");

const _addPublisher = function(req,res, game){
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
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

        res.status(response.status).json(response.message);
    });
};

const _updateFullPublisher = function(req,res,game){
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    game.save(function(err, updateGame){
        const response = {
            status: 204,
            message: updateGame
        }
        if (err){
            response.status = 500;
            response.message = err;
        } else {
            response.message = updateGame;
        }
        res.status(response.status).json(response.message);

})
};

const _deletePublisher = function(req,res,game){
    game.publisher.remove();
            game.save(function (err, deletedGame) {
                const response = {
                    status: 204,
                    message: deletedGame
                }
                if (err) {
                    console.log("Game not updated");
                    response.status = 500;
                    response.message = err;
                } else {
                    // response.status = notFoundError;
                    response.message = deletedGame
                }
            res.status(response.status).json(response.message);
            })
}

module.exports.publisherGetOne = function(req,res){
    const gameId = req.params.gameId;
   Game.findById(gameId).exec(function(err,game){
       const publisher = game.publisher;
       res.status(200).json(publisher);
   })
}


module.exports.publisherAddOne = function (req, res) {
    console.log("Add one publisher");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        console.log("game",game);
        const response = {
            status: 204,
            message: game
        }
        if (err){
            response.status = 500;
            response.message = err;
        } else if (!game){
            console.log("Error creating game");
            response.status = 404,
            response.message = {"message": "Game ID not found"};
        } 
        if (game) {
            console.log("got game",game);
            _addPublisher(req, res, game);
        } else{
            res.status(response.status).json(response.message);
        }
    })
   
}


module.exports.publisherFullUpdateOne = function(req, res){
    console.log("One publisher received");
    const gameId = req.params.gameId;

   
    
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 204,
            message: game
        }
        if (err) {
            console.log("Publisher not updated");
            response.status = 500;
            response.message = err;
        } else if (!game){
            response.status = 404;
            response.message = { "message": "Publisher not found" }
        } if (game) {
            _updateFullPublisher(req,res,game);
        }
        // res.status(response.status).json(response.message);
    })
}


module.exports.publisherDeleteOne = function(req, res){
    console.log("Delete  publisher");
  
    const gameId = req.params.gameId;
    
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 204,
            message: game
        }
        if (err) {
            console.log("Publishe not deleted");
            response.status = 500;
            response.message = err;
        } else if (!game){
            response.status = 404;
            response.message = { "message": "Publisher not found" }
        } 
        if (game) {
            _deletePublisher(req,res,game)
        }
        //res.status(response.status).json(response.message);
    })
}
