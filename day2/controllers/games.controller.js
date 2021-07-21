const gamesData = require("../data/games.json");

module.exports.gamesGetAll = function(req, res){
    const pageGames = gamesData;
    res.status(200).send(pageGames);

}