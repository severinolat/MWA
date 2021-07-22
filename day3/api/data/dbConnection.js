const MongoClient = require("mongodb").MongoClient;

const dbName = "gamesDB";
const dburl = "mongodb://localhost:27017/"+dbName;

let _connection = null;

const open = function(){
    MongoClient.connect(dburl,function(err, client){
        if(err){
            console.log("Connexion failed");
            return
        } 
        _connection = client.db(dbName);
        console.log("Connexion open", _connection);
    })
}

const get = function(){
    return _connection;
}

module.exports = {
    open : open,
    get : get
}