const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    location :{
        //address: String
        type:{
            type: String
        },
        coordinates:{
            type: [Number], // store coordinates in longitude (E/W) latitude (N/S)
            index: "2dsphere"
        } 
    }
});

const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year : Number,
    rate : {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    designers: [String],
    publisher: publisherSchema
});

//compile the model ( convert scheme to mongoose model)
mongoose.model("Game", gamesSchema, "games");