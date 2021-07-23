const express = require("express");
 const controllerGames = require("../controllers/game.controller");

 const router = express.Router();

 router.route("/games")
    .get(controllerGames.gamesgetAll);

router.route("/games/:gameId")
    .get(controllerGames.gamesgetOne);


module.exports = router;