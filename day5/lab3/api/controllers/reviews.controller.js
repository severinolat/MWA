const { response } = require('express');
const mongoose = require('mongoose');
const Game = mongoose.model("Game");


const _addReview = function(req, res, game){
    
    const newReview = {
        name: req.body.name,
        review: req.body.review,
        date: req.body.date
    }
    game.review.push(newReview);

    game.save(function(err, updateGame){
        const response = {
            status:204,
            message : updateGame
        }
        if (err){
            response.status = 500;
            response.message = err;
        } else {
            response.message = updateGame;
        }
        res.status(response.status).json(response.message);

    })
    
}


module.exports.reviewGetAll = function(req, res){
    
    console.log("Get reviews");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).select("review").exec(function(err, review){
        const response = {
            status: 204,
            message: review
        }
        console.log("Get reviews",review);
        if (err){
            response.status = 500;
            response.message = err;
        } else {
            response.message = review ; 
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.reviewGetOne = function(req, res){
   
    console.log("Get one ");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).select("review").exec(function(err, review){
        const response = {
            status: 204,
            message: res
        }
        if (err){
            response.status = 500;
            response.message = err;
        } else {
            response.message = review ; 
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.reviewAddOne = function (req, res) {
    console.log("Add one review");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 204,
            message: game
        }
        if (err){
            response.status = 500,
            response.message = err;
        } else if (!game){
            console.log("Error ading review");
            response.status = 404,
            response.message = {"message": "Game ID not found"};
        } 
        if (game) {
            _addReview(req, res, game);
        } else{
            res.status(response.status).json(response.message);
        }
    })
   
}

module.exports.reviewFullUpdateOne = function(req, res){
    console.log("Get one publisher request received");
    
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 204,
            message: game
        }
        if (err) {
            console.log("Game not updated");
            response.status = 500;
            response.message = err;
        } else if (!game){
            response.status = 404;
            response.message = { "message": "game not found" }
        } if (game) {
           
            game.review.name = req.body.name;
            game.review.review = req.body.review;
            game.review.date = req.body.date;

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
        }
    })
}

module.exports.reviewDeleteOne = function(req, res){
    console.log("Delete request received");
   
    const gameId = req.params.gameId;
    
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 204,
            message: game
        }
        if (err) {
            console.log("Review not deleted");
            response.status = 500;
            response.message = err;
        } else if (!game){
            response.status = 404;
            response.message = { "message": "Publisher not found" }
        } 
        if (game) {
            game.review.remove();
            game.save(function (err, deletedGame) {
                if (err) {
                    console.log("Review not updated");
                    response.status = 500;
                    response.message = { "message": "Review not updated" }
                } else {
                    response.message = deletedGame
                }
            })
        }
        res.status(response.status).json(response.message);
    })
}