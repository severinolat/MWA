
const mongoose = require("mongoose");


const {ObjectId} = require("mongodb");
const Game = mongoose.model("Game");

module.exports.gamesGetAll = function(req, res){
    console.log("Json request received");

    let count = 5;
    let offset = 0;

    if(req.query && req.query.count){
        count = parseInt(req.query.count,10) ;
    }
    if(req.query && req.query.count){
        offset = parseInt(req.query.offset,10) ;
    }

    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({message:"QueryString offset and count should be a number"});
        return;
    }
    
    Game.find().skip(offset).limit(count).exec(function(err, games) {
        if(err){
            console.log("Error finding games");
            res.status(500).json(err);
        } else{
            console.log("Found games", games);
            res.status(200).json(games);
        }
        
        });
}



module.exports.gamesGetOne = function(req,res){
    console.log("Get One games");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        const response = {
            status:200,
            message:game
        }
        if(err){
            console.log("Error finding game");
            res.status =500;
            res.message = err;
            
        }else if(!game){
            response.status = 404;
            response.message = {message: "Game with given ID is not found"}
           
        }
        res.status(response.status).json(response.message);
       
    })
   
    
}

module.exports.gamesAddOne = function(req,res){
    console.log("AddOne games",req.body);
   
        const newGame = {
            title : req.body.title,
            year: parseInt(req.body.year),
            rate: parseInt(req.body.rate),
            price: parseFloat(req.body.price),
            minPlayers: parseInt(req.body.minPlayers),
            maxPlayers: parseInt(req.body.maxPlayers),
            minAge: parseInt(req.body.minAge),
            designers:req.body.designers,
            publisher:{}
        };
        Game.create(newGame, function(err,createResponse){
            console.log("ici1",newGame);
            const response = {
                status : 201,
                message : createResponse
            }
            if(err){
                response.status = 500;
                response.message = err;
            }else{
                response.message = "Game saved";
            }
           
            res.status(response.status).json(response.message);
        })
    

}


    module.exports.gamesFullUpdateOne = function(req,res){
        console.log("Get One games with full update");
        const gameId = req.params.gameId;
        
        Game.findById(gameId).exec(function(err,game){
            const response = {
                status:204,
                message:game
            }
            console.log("the game",game);
            if(err){
                console.log("Error finding game");
                res.status =500;
                res.message = err;
                
            }else if(!game){
                response.status = 404;
                response.message = {message: "Game with given ID is not found"}
               
            }
            
            if(response.status !== 204){
                res.status(response.status).json(response.message);
            } else{
                game.title =  req.body.title;
                game.year =  parseInt(req.body.year);
                game.rate = parseInt(req.body.rate),
                game.price = parseFloat(req.body.price),
                game.minPlayers = parseInt(req.body.minPlayers),
                game.maxPlayers = parseInt(req.body.maxPlayers),
                game.minAge = parseInt(req.body.minAge),
                game.designers = [req.body.designer],
                game.save(function(err, updatedGame){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                   
                    res.status(response.status).json(response.message);
                    
                });
            }
            
           
        })
       
        
    }



    module.exports.gamesPartialUpdateOne = function(req,res){
        console.log("Get One games");
        const gameId = req.params.gameId;
        Game.findById(gameId).exec(function(err,game){
            console.log("The",game);
            const response = {
                status:204,
                message:game
            }
            if(err){
                console.log("Error finding game");
                res.status =500;
                res.message = err;
                
            }else if(!game){
                response.status = 404;
                response.message = {message: "Game with given ID is not found"}
               
            }
            console.log("her");
            if(response.status !== 204){
                console.log("her2",response.status);
                res.status(response.status).json(response.message);
            } else{
                
                if(game.title){game.title =  req.body.title;}
                
                if(game.year){game.year =  parseInt(req.body.year);}
                if(game.rate){game.rate = parseInt(req.body.rate);}
                if(game.price){game.price = parseFloat(req.body.price);}
                if(game.minPlayers){game.minPlayers = parseInt(req.body.minPlayers);}
                if(game.maxPlayers){game.maxPlayers = parseInt(req.body.maxPlayers);}
                if(game.minAge){game.minAge = parseInt(req.body.minAge);}
                if(game.designers){game.designers = [req.body.designer];}
                console.log("here game",game);
                game.save(function(err, updatedGame){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                    
                })
            }
           // res.status(response.status).json(response.message);
           
        })
       
        
    }



    module.exports.gamesDeleteOne = function(req,res){
        console.log("Get One games");
        const gameId = req.params.gameId;
        Game.findByIdAndDelete(gameId).exec(function(err,game){
            const response = {
                status:200,
                message:game
            }
            if(err){
                console.log("Error finding game");
                res.status =500;
                res.message = err;
                
            }else if(!game){
                response.status = 404;
                response.message = {message: "Game with given ID is not found"}
               
            }
            res.status(response.status).json(response.message);
           
        })
       
        
    }


