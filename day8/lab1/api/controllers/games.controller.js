
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const runGeoQuery = function(req, res){
    const lat = parseFloat(req.params.lat);
    const lng = parseFloat(req.params.lng);
    console.log(("Geo search lng,lat"),lng,lat);

    const query = {
        "publisher.location":{
            $near : {
                $geometry:{
                    type: "Point",
                    coordinates: [lng,lat]
                },
                $maxDistance:1000,
                $minDistance:0
            }
        }
    };
    Game.find(query).exec(function(err,games){
        res.json(games);
    });

};

module.exports.gamesGetAll = function(req, res){
    console.log("Json request received");

    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req,res);
        return;
    }
    

    let count = 5;
    //help me say fisrt etc and from where start
    let offset = 0;

    //everythings in query is string so we need to convert to number with parseInt
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
    //Using mongodb driver
    // // const pageGames = gamesData.slice(offset, offset + count);
    // const db = dbConnection.get();
    // const collection = db.collection("games");
    // // const docs = collection.find({});
    // console.log(db);

    // collection.find().skip(offset).limit(count).toArray(function(err, games){
    //     console.log(games);
    //     res.status(200).json(games);
    // });
     
    // res.status(200).json(gamesData);

    //using mongoose
    /*Game.find().exec(function(err,games){
        console.log("GetOne games");
        res.status(200).json(games);

    });*/
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
                //this is where we update the game
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
                //this is where we update the game
                
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


