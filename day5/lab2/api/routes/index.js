const express = require("express");

const controllerGames = require("../controllers/games.controller");
const controllerPublisher = require("../controllers/publisher.controller");

const router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);
        
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdateOne)
    .patch(controllerGames.gamesPartialUpdateOne)
    .delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers/:publisherId")
    .get(controllerPublisher.publisherGetOne);

router.route("/games/:gameId/publisher")
    .post(controllerPublisher.publisherAddOne)
    .put(controllerPublisher.publisherFullUpdateOne)
    .delete(controllerPublisher.publisherDeleteOne);



    
module.exports = router;