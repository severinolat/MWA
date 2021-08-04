
const mongoose = require("mongoose");
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
    Game.find().skip(offset).limit(count)
        .then((games)=>res.status(200).json(games))
        .catch((err)=> _HamdleError(err,res));

   
}





function _HamdlenoGameError(status, message) {
    const response = {
      status: status,
      message: message,
    };
    throw response;
  }
  

function _HamdleError(err,res){
    console.log("Error finding game");
    res.status(404).json(err.message);
}

module.exports.gamesGetOne = function(req,res){
    console.log("Get One games");
    const gameId = req.params.gameId;
    Game.findById(gameId)
        .then((game)=>res.status(200).json(game))
        .catch((err)=> _HamdleError(err,res));
     
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
        Game.create(newGame)
            .then((result) => res.status(201).json(result))
            .catch((err) => _HamdleError(err, res));
     
}

   


    module.exports.gamesFullUpdateOne = function(req,res){
        console.log("Get One games with full update");
        const gameId = req.params.gameId;

        Game.findById(gameId)
            .then((game)=>{
                if(!game){
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
            .catch((err) => _HamdleError(err, res));
   
       
        
    }



    module.exports.gamesPartialUpdateOne = function(req,res){
        console.log("Get One games");
        const gameId = req.params.gameId;

        Game.findById(gameId)
        .then((game)=>{
            if(!game){
                response.status = 404;
                response.message = {message: "Game with given ID is not found"}
               
            }
            
            if(response.status !== 204){
                res.status(response.status).json(response.message);
            } else{
                if(game.title){game.title =  req.body.title;}
                console.log("here",req.body.title);
                if(game.year){game.year =  parseInt(req.body.year);}
                if(game.rate){game.rate = parseInt(req.body.rate);}
                if(game.price){game.price = parseFloat(req.body.price);}
                if(game.price){game.minPlayers = parseInt(req.body.minPlayers);}
                if(game.price){game.maxPlayers = parseInt(req.body.maxPlayers);}
                if(game.price){game.minAge = parseInt(req.body.minAge);}
                if(game.price){game.designers = [req.body.designer];}

                game.save(function(err, updatedGame){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                    
                });

                
            }
        })
        .catch((err) => _HamdleError(err, res));
       
        
    }



    
    module.exports.gamesDeleteOne = function(req,res){
        console.log("Get One games");
        const gameId = req.params.gameId;
        Game.findByIdAndDelete(gameId)
            .then((game)=>{
                if (!game) _HamdlenoGameError(404, "game not found");
                res.status(204).json(game);
            })
            .catch((err) => _HamdleError(err, res));     
        
    }


