const express = require("express");

const gameController = require("../controllers/games.controller");

const router = express.Router();

router.route("/games")
    .get(gameController.gamesGetAll);


module.exports = router;