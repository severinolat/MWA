const express = require("express");
const controllerGames = require("../controllers/gamesController");

const router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll);


    module.exports = router;